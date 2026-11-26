# Build an agentic training video pipeline

A brief for an AI agent. Give this whole file to your agent (Claude Code, OpenClaw or similar) along with access to your app's code and a running copy of the app.

The goal: every job in your software gets a short narrated training video, made from the real screens, kept up to date automatically when the software changes, and delivered to the people who need it. A human only approves the final release.

---

## 1. What the agent is building

For each job a user does in the app (for example "Approve a refund" or "Add a new customer"), the pipeline produces:

1. A written step-by-step guide.
2. A narrated screen recording, 50 to 90 seconds long, of the job being done in the real app.
3. A release: the guide and video added to the app, an email to the people affected, and an in-app prompt on the relevant screen.

And it keeps them current. When a screen changes, only the affected guides and videos are rebuilt.

## 2. What you need before starting

| Need | Suggested tool | Notes |
|---|---|---|
| An agent that can read code and run commands | Claude Code, OpenClaw or similar | Runs the whole pipeline |
| Text-to-speech | ElevenLabs | Pick one voice and keep it for every video |
| Browser automation and recording | Playwright | Records the real app in Chromium |
| Video assembly | ffmpeg | Joins voice and picture, adds titles |
| Brand assets | Your design tool of choice | Intro card, logo, fonts |
| Private video storage | Any storage with signed links | Videos should only be visible to signed-in users |
| Email sending | Your existing email provider | For release emails |
| A test or demo account | In your app | Anything that saves or sends happens here |
| A disposable "sink" email address | Your email provider | So recordings never email a real person |

Keep API keys in a secrets manager. Load them for a run, never write them into the repo or the scripts.

## 3. Rules the agent must follow

1. **Guide first, video second.** Never record a video without an approved written guide.
2. **Use the words on the screen.** Button and menu names exactly as they appear. No internal jargon, database field names or status codes.
3. **One sentence per action.** Never one long voiceover over a whole page.
4. **Voice first, pictures second.** Generate the audio, measure each clip, and let those lengths set the pace of the recording.
5. **Never narrate something before it's on screen.** If a button only appears after a load, split the sentence.
6. **Tell the truth.** If the product has a known rough edge, the narration warns about it. Never promise a safeguard that doesn't exist.
7. **No real writes.** Block or cancel anything that saves, sends or deletes, unless it's on a demo account.
8. **No real personal data on camera.** Mask it before the page renders it (section 6).
9. **Check frames, not logs.** A log saying "success" proves nothing. Look at the pictures.
10. **A human approves every release.** The agent opens a pull request. It never merges its own work.

## 4. Folder structure

```
training/
  guides/
    <guide-id>.md           # the written guide
  scripts/
    <guide-id>.json         # narration, one entry per action
  audio/
    <guide-id>/clip-01.mp3  # one file per sentence
    <guide-id>/durations.json
  recordings/
    <guide-id>.webm         # raw screen recording
  output/
    <guide-id>.mp4          # finished video
  qa/
    <guide-id>-sheet.png    # contact sheet for review
  manifest.json             # every guide, its buttons, video status, version
```

`manifest.json` is the index. For each guide it stores: id, title, audience (roles), the screens and button names it depends on, the video file, and a hash of the narration text.

## 5. The pipeline, step by step

### Step 1: Decide what to cover

- Read the app's routes, navigation and role permissions. List every job a user does.
- Read the development documents and recent pull requests to understand what each feature is meant to achieve.
- Order the list by pain: the jobs people get wrong most often, or where work is piling up, go first. Ask the human owner if unsure.

### Step 2: Write the guide

Every guide has the same six parts:

1. **Who** needs it.
2. **When** you use it.
3. **Steps**, numbered, with exact button names in bold.
4. **What happens next** (who gets notified, what moves on).
5. **Watch out**: the mistakes people actually make.
6. **Check yourself**: one small task to try.

Take a screenshot for each step with Playwright. Draw a numbered box on the control, crop tightly and mask personal data. Record in `manifest.json` every button and screen the guide relies on.

### Step 3: Write the script

`scripts/<guide-id>.json`:

```json
{
  "title": "Approve a refund",
  "subtitle": "Checking and approving a refund request",
  "clips": [
    { "id": "01", "text": "Open Refunds from the menu on the left.", "action": "click:nav-refunds" },
    { "id": "02", "text": "Pick the request you want to check.", "action": "click:first-row" },
    { "id": "03", "text": "Read the reason, then press Approve.", "action": "highlight:approve-button,click" }
  ]
}
```

One clip per on-screen action. Short, plain sentences. Second person ("you"), present tense.

### Step 4: Generate the voice

- Send each clip's text to the text-to-speech service. Save one audio file per clip.
- Measure each file's length and write `durations.json`.
- Hash each sentence. If the hash hasn't changed since the last run, reuse the existing audio. Rebuilding a video with unchanged words should cost nothing.
- Keep an offline fallback (the operating system's built-in voice) that produces the same timing file, so recordings can be rehearsed for free.

### Step 5: Record the screen

- Start Playwright signed in as a user with the right role. Use a short-lived session created for the run, not a stored password. Delete it afterwards.
- Record at a fixed size, for example 1600 × 900.
- Start on a dark title card showing the title and subtitle.
- For each clip:
  1. Mark the start of the beat (see Step 6).
  2. Draw a red highlight box around the control being named.
  3. Perform the action.
  4. Wait until that clip's audio length has passed before moving on.
- Inject a visible cursor dot, because the real pointer isn't captured. Install it once per page and guard against duplicates after navigation.
- Scroll to the element being talked about, not by fixed pixel amounts. Many apps scroll an inner panel, not the window, so find the right container.
- Clear highlight boxes immediately after a click that closes a menu, so a box never frames empty space.

### Step 6: Sync voice to picture

Don't rely on one start offset. Slow pages will push everything out of time.

- During recording, paint a small square (about 10 px) in a corner of the page that changes colour at the start of every clip.
- After recording, scan the video for each colour change and note the frame.
- Place each clip's audio at its frame. If a page was slow, later sentences simply wait for their marker.
- Crop the marker strip off the final video.
- Save a `sync.json` showing where each sentence landed.

### Step 7: Assemble

With ffmpeg, scripted, no manual timeline:

- Join video (H.264) and audio (AAC).
- Add the brand intro and outro cards, crossfaded, and shift the narration past the intro so nothing is clipped.
- No background music unless it's licensed. Unlicensed music is the easiest way to get a copyright claim.
- Compress to a sensible size (under about 10 MB for a 90-second video).

### Step 8: Check it

- Build a contact sheet: one frame from the start of every sentence, on one image.
- Check every frame: is the right screen showing, is the box on the thing being named, did the click land, is any real personal data visible?
- If the recording claims something was created, confirm it in the database or the UI. Don't trust the script's own report.
- If a bug appears while filming, don't publish a video of it. Report it to the human, then record around it or wait for the fix.
- Rehearse with the offline voice before spending on the real one.

### Step 9: Release

- Upload the video to private storage. Serve it to signed-in users through a short-lived signed link.
- Add the guide and video to a Training page in the app. Show each guide's status (video or written only) and a "Start here" welcome video at the top.
- Add an in-app prompt: when a user opens a screen covered by a guide, a small chat bubble offers the video.
- Draft an email to the roles in the guide's audience: what's changed, a one-line summary, and a link to the video.
- Open a pull request with the guide, video reference, in-app changes and email draft. Include the contact sheet in the description so the reviewer can see every frame at a glance.
- Stop. A human reviews and merges. The email goes out after the merge.

## 6. Keeping personal data off camera

Prefer a demo environment with fake data. If you must record on real data:

- **Intercept every API response** before the page sees it and replace names, emails, phone numbers and addresses with made-up ones. Keep them consistent: the same real person becomes the same invented person on every screen.
- **If a response can't be parsed, block it.** Never show it unmasked.
- **Redact email addresses entirely** rather than inventing them. A made-up name in the address next to a different made-up name in the letter looks like a mistake.
- **Blur free text** that can't be masked reliably: message bodies, notes, comments, logos of real customers.
- **Scale or randomise money figures** so screens look real without revealing true numbers.
- **Generate realistic fake identifiers** (reference numbers, registration plates) in the right format so screens still look real.
- Every leak found on a take gets added to the masking rules. Then check by eye anyway.

## 7. Keeping it up to date

This is the part that makes it worth building.

- **On every merged pull request** to the app, the agent checks which screens and button names changed.
- It compares them with `manifest.json` to find the guides that depend on them.
- For each affected guide: update the written steps, update only the sentences that changed, reuse the rest of the audio, re-record and re-check.
- New feature with no guide? Draft one, and flag it for the human to approve as a new guide.
- After every deploy, run an audit: every guide shows the right status, every video loads, every button named in a guide still exists.
- Every mistake the human points out in review becomes a written rule in this file, so it isn't repeated.

## 8. Definition of done

A guide is done when:

- [ ] The written guide has all six parts and uses exact button names.
- [ ] The video is under 90 seconds, or split into parts.
- [ ] Every sentence lands within a fraction of a second of its action.
- [ ] The contact sheet shows the right screen and box at every sentence.
- [ ] No real personal data is visible anywhere.
- [ ] Nothing was saved or sent outside a demo account.
- [ ] The manifest lists every screen and button it depends on.
- [ ] The pull request includes the contact sheet and the email draft.
- [ ] A human has approved it.

## 9. Start small

Don't try to cover the whole app on day one.

1. Pick the single job that causes the most mistakes or questions.
2. Build the guide, the video and the release for that one job.
3. Get the human to review it and turn their notes into rules.
4. Then do the next five.

Once the first one is right, the rest are mostly repetition, which is exactly what the agent is for.
