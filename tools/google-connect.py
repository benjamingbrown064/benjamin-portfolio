#!/usr/bin/env python3
"""Print the one-time link Ben opens to let benjaminbrown.co add coffee bookings to his Google Calendar.

The link is signed with the site's admin token and is valid for 30 minutes. Needs, in the environment:
  GOOGLE_CLIENT_ID   the OAuth client id (not secret)
  SITE_ADMIN_TOKEN   the live site's admin token
Usage: python3 tools/google-connect.py
Mirrors connectState() and connectUrl() in src/lib/gcal.ts; keep them in step."""
import hashlib, hmac, os, sys, time, urllib.parse

cid, admin = os.environ.get("GOOGLE_CLIENT_ID"), os.environ.get("SITE_ADMIN_TOKEN", "")
if not cid or len(admin) < 32:
    sys.exit("GOOGLE_CLIENT_ID and SITE_ADMIN_TOKEN are needed")
ts = str(int(time.time() * 1000))
sig = hmac.new((admin + ":google").encode(), ts.encode(), hashlib.sha256).hexdigest()[:32]
q = urllib.parse.urlencode({
    "client_id": cid, "redirect_uri": "https://benjaminbrown.co/api/google/callback", "response_type": "code",
    "scope": "openid email https://www.googleapis.com/auth/calendar.events", "access_type": "offline", "prompt": "consent",
    "login_hint": "ben@benjaminbrown.co", "state": ts + "." + sig,
})
print("https://accounts.google.com/o/oauth2/v2/auth?" + q)
