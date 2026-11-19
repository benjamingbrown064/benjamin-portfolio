const WLD = window.WilboLawDesignSystem_c42bb7;
const WL_ICONS = {
  'file-text': '../assets/web/wl/i/file-text.svg',
  'upload': '../assets/web/wl/i/upload.svg',
  'calendar': '../assets/web/wl/i/calendar.svg',
  'shield-check': '../assets/web/wl/i/shield-check.svg',
  'check': '../assets/web/wl/i/check.svg',
  'clock': '../assets/web/wl/i/clock.svg',
  'layout-dashboard': '../assets/web/wl/i/layout-dashboard.svg',
  'folder': '../assets/web/wl/i/folder.svg',
  'search': '../assets/web/wl/i/search.svg',
  'message-square': '../assets/web/wl/i/message-square.svg',
  'download': '../assets/web/wl/i/download.svg',
  'user': '../assets/web/wl/i/user.svg',
  'bell': '../assets/web/wl/i/bell.svg',
  'chevron-right': '../assets/web/wl/i/chevron-right.svg',
  'arrow-right': '../assets/web/wl/i/arrow-right.svg',
};
const WlI = ({ n, s = 16, c }) => <WLD.Icon src={WL_ICONS[n]} size={s} color={c} />;
const WL_CASE = 'Martinez v. Pacific Coast Logistics';
const WL_ADJ = 'ADJ14892037';
const WL_ISSUES = [
  ['QME Chen (p.4) apportions 25% of the lumbar spine to DDD on MRI findings alone, with no how/why.', 'QME p.4'],
  ['QME Chen places Martinez in DRE III on SLR and MRI alone despite a normal neurologic exam.', 'QME p.4'],
  ['The history leaves out the low back soreness Martinez admitted to in her deposition, though Chen lists the deposition as reviewed.', 'QME p.2'],
];

function WlmBar({ title, right }) {
  return <div className="wlm-bar"><WLD.Logo variant="mark" size={18} /><span className="wlm-bt">{title}</span><span className="wlm-ref" style={{ marginLeft: 'auto' }}>{right || WL_ADJ}</span></div>;
}

function WlmIssue({ t, p }) {
  return <div className="wlm-iss"><div className="wlm-iss-t">{t}</div><div className="wlm-iss-m"><WLD.Severity level="high">High</WLD.Severity><span className="wlm-ref">{p}</span></div></div>;
}

function WlmFile({ fresh, w = 520 }) {
  const docs = [['PQME report', 'Robert J. Chen, M.D.', '84 pp'], ['Deposition', 'Maria Elena Martinez', '112 pp'], ['Treating records', 'Scanned, read by OCR', '320 pp'], ['Letters', 'Alder & Marsh', '14 pp']];
  return (
    <div className="wlm wlm-win" style={{ width: w }}>
      <WlmBar title={WL_CASE} />
      <div className="wlm-pad" style={{ paddingBottom: 6 }}><WLD.Kicker>The file · {docs.length} documents</WLD.Kicker></div>
      {docs.map(([k, n, pp], i) => (
        <div key={k} className={'wlm-row' + (fresh && i === 0 ? ' new' : '')}>
          <WlI n="file-text" c="var(--ink-3)" />
          <div style={{ flex: 1, minWidth: 0 }}><b className="wlm-rt">{k}</b><span className="wlm-rs">{n}</span></div>
          <span className="wlm-ref">{pp}</span>
          {fresh && i === 0 ? <WLD.Chip variant="accent">New</WLD.Chip> : <span className="wlm-ok"><WlI n="check" s={14} c="var(--ok)" />Read</span>}
        </div>
      ))}
      <div className="wlm-foot"><span>Every page read, typed and dated</span><span className="wlm-ref">On the case timeline</span></div>
    </div>
  );
}

function WlmIssues({ w = 540, items = [0, 1], more = 2 }) {
  return (
    <div className="wlm wlm-win" style={{ width: w }}>
      <WlmBar title="Issues · PQME, Dr. Chen" />
      <div className="wlm-pad" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 4 }}><WLD.Kicker>35 checks run</WLD.Kicker><WLD.Severity level="high" style={{ marginLeft: 'auto' }}>4 high</WLD.Severity></div>
      <div className="wlm-pad" style={{ display: 'grid', gap: 10 }}>{items.map(i => <WlmIssue key={i} t={WL_ISSUES[i][0]} p={WL_ISSUES[i][1]} />)}</div>
      {more ? <div className="wlm-foot"><span>{more} more high-severity issues</span><WlI n="chevron-right" s={14} c="var(--ink-3)" /></div> : null}
    </div>
  );
}

function WlmDraft({ w = 520, approve = true }) {
  return (
    <div className="wlm wlm-win" style={{ width: w }}>
      <div className="wlm-letter">
        <div className="wlm-lh"><b>Alder &amp; Marsh</b><span className="wlm-ref">Nov 18, 2026</span></div>
        <WLD.Kicker style={{ marginTop: 18 }}>Supplemental report request</WLD.Kicker>
        <p className="wlm-to">Robert J. Chen, M.D.</p>
        <p className="wlm-re">RE: MARIA ELENA MARTINEZ VS. PACIFIC COAST LOGISTICS, INC. · {WL_ADJ}</p>
        <div className="wlm-q"><span className="wlm-ref">1</span><p>List each objective sign of radiculopathy you found, by nerve root level and side, and reconcile DRE III with your findings of 5/5 strength and 2+ symmetric reflexes.</p></div>
        <div className="wlm-q dim"><span className="wlm-ref">2</span><p><i className="wlm-ln" style={{ width: '92%' }}></i><i className="wlm-ln" style={{ width: '64%' }}></i></p></div>
      </div>
      <div className="wlm-foot"><span className="wlm-ok"><WlI n="shield-check" s={14} c="var(--ok)" />16 citations checked</span><span className="wlm-ref">Draft for attorney review</span>{approve ? <WLD.Button variant="primary" size="sm" style={{ marginLeft: 'auto' }}>Approve and export PDF</WLD.Button> : null}</div>
    </div>
  );
}

function WlmPlan({ w = 500 }) {
  return (
    <div className="wlm wlm-win" style={{ width: w }}>
      <WlmBar title="Plan · Martinez" />
      <div className="wlm-pad" style={{ display: 'grid', gap: 18 }}>
        <div><WLD.Kicker tone="accentText">Next move</WLD.Kicker><p className="wlm-h" style={{ marginTop: 8 }}>Ask for a supplemental report before the MSC.</p></div>
        <WLD.Citation label="Why · PQME p.2, p.4">Four high-severity issues, each with its page. If nobody raises them before the MSC, they usually stay.</WLD.Citation>
        <div className="wlm-steps">
          <div className="on"><i></i><span>Supplemental request to Dr. Chen</span><span className="wlm-ref">Draft</span></div>
          <div><i></i><span>Mandatory settlement conference</span><span className="wlm-ref">MSC</span></div>
        </div>
      </div>
      <div className="wlm-foot"><WLD.Button variant="primary" size="sm">Draft the request</WLD.Button></div>
    </div>
  );
}

function WlmCompare({ w = 520 }) {
  return (
    <div className="wlm wlm-win" style={{ width: w }}>
      <WlmBar title="What changed · Supplemental" />
      <div className="wlm-pad" style={{ display: 'grid', gap: 22 }}>
        <div><WLD.Kicker>Lumbar rating</WLD.Kicker><div className="wlm-mv"><span className="was">DRE III</span><WlI n="arrow-right" s={20} c="var(--ink-3)" /><span>DRE II</span></div></div>
        <div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><WLD.Kicker>Questions answered</WLD.Kicker><b className="wlm-fig">6 of 10</b></div><div className="wlm-segs">{Array.from({ length: 10 }, (_, i) => <i key={i} className={i < 6 ? 'on' : ''}></i>)}</div></div>
      </div>
      <div className="wlm-foot"><WLD.Severity level="attention">4 still open</WLD.Severity><span className="wlm-ref" style={{ marginLeft: 'auto' }}>Compared with PQME</span></div>
    </div>
  );
}

function WlmStatus({ w = 520 }) {
  return (
    <div className="wlm wlm-win" style={{ width: w }}>
      <WlmBar title="30-day status report" />
      <div className="wlm-pad" style={{ display: 'grid', gap: 16 }}>
        <WLD.Kicker>For the claims examiner</WLD.Kicker>
        <p className="wlm-big">“Dr. Chen rated the lower back at 12%. We think the report doesn’t support that number, and we have asked him to explain it.”</p>
        <div className="wlm-steps"><div className="on"><i></i><span>Object to the four open issues</span><span className="wlm-ref">Next</span></div></div>
      </div>
      <div className="wlm-foot"><span>Drafted from the work already done</span><WLD.Button size="sm" style={{ marginLeft: 'auto' }}>Review draft</WLD.Button></div>
    </div>
  );
}

function WlmToday({ w = 560 }) {
  const G = [
    ['Due', [['Martinez', 'Supplemental request to Dr. Chen', 'Today'], ['Okafor', 'MSC statement', 'Nov 19']]],
    ['Waiting', [['Delgado', 'AME supplemental from Dr. Park', '21 days']]],
    ['New overnight', [['Martinez', 'Supplemental report arrived', 'New'], ['Whitfield', 'Treating records, 46 pp', 'New']]],
  ];
  return (
    <div className="wlm wlm-win" style={{ width: w }}>
      <WlmBar title="Today" right="Nov 18, 2026" />
      {G.map(([k, rows]) => (
        <div key={k}>
          <div className="wlm-pad" style={{ paddingBottom: 4, paddingTop: 14 }}><WLD.Kicker>{k}</WLD.Kicker></div>
          {rows.map(([c, t, d]) => <div key={c + t} className="wlm-row"><b className="wlm-rt" style={{ width: 96, flex: 'none' }}>{c}</b><span style={{ flex: 1, minWidth: 0, color: 'var(--ink-2)' }}>{t}</span>{d === 'New' ? <WLD.Chip variant="accent">New</WLD.Chip> : <span className="wlm-ref">{d}</span>}</div>)}
        </div>
      ))}
      <div className="wlm-foot"><span>Every file, one next step</span></div>
    </div>
  );
}

function WlmExposure({ w = 480 }) {
  return (
    <div className="wlm wlm-win" style={{ width: w }}>
      <WlmBar title="Exposure · Lumbar spine" />
      <div className="wlm-pad" style={{ display: 'grid', gap: 20 }}>
        <div className="wlm-two"><div><WLD.Kicker>As rated</WLD.Kicker><b className="wlm-fig">12%</b><span className="wlm-ref">DRE III · WPI</span></div><div><WLD.Kicker tone="accentText">If DRE II</WLD.Kicker><b className="wlm-fig">5–8%</b><span className="wlm-ref">DRE II · WPI</span></div></div>
        <div><WLD.Kicker>The maths</WLD.Kicker><div className="wlm-math">{['WPI', 'FEC', 'Occupation', 'Age', 'PD'].map((s, i) => <React.Fragment key={s}>{i ? <WlI n="chevron-right" s={12} c="var(--ink-4)" /> : null}<span>{s}</span></React.Fragment>)}</div></div>
      </div>
      <div className="wlm-foot"><span className="wlm-ref">2005 rating schedule</span></div>
    </div>
  );
}

function WlmApp() {
  const nav = [['layout-dashboard', 'Today'], ['folder', 'Cases', true], ['file-text', 'Drafts'], ['search', 'Library']];
  return (
    <div className="wlm wlm-app" style={{ width: 1440, height: 810 }}>
      <aside><WLD.Logo size={26} /><nav>{nav.map(([i, l, a]) => <WLD.NavItem key={l} label={l} active={!!a} icon={<WlI n={i} c={a ? '#fff' : 'var(--ink-3)'} />} />)}</nav><div className="wlm-me"><WlI n="user" c="var(--ink-3)" /><span><b>Sarah Novak</b>Attorney · Alder &amp; Marsh</span></div></aside>
      <main>
        <div className="wlm-ah"><div><WLD.Kicker>Case · {WL_ADJ}</WLD.Kicker><h3>{WL_CASE}</h3></div><div style={{ display: 'flex', gap: 8 }}><WLD.Chip>PQME · Dr. Chen</WLD.Chip><WLD.Severity level="high">4 high</WLD.Severity></div></div>
        <div className="wlm-tabs">{['File', 'Issues', 'Plan', 'Drafts', 'Exposure'].map(t => <span key={t} className={t === 'Issues' ? 'on' : ''}>{t}</span>)}</div>
        <div className="wlm-cols">
          <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>{WL_ISSUES.map(([t, p], i) => <div key={i} className={'wlm-iss' + (i === 0 ? ' sel' : '')}><div className="wlm-iss-t">{t}</div><div className="wlm-iss-m"><WLD.Severity level="high">High</WLD.Severity><span className="wlm-ref">{p}</span></div></div>)}</div>
          <div className="wlm-page">
            <div className="wlm-ph"><WLD.Kicker>PQME report · Robert J. Chen, M.D.</WLD.Kicker><span className="wlm-ref">p.4 of 84</span></div>
            <div className="wlm-doc">
              <p><b>Impairment.</b> Lumbar spine, DRE Category III. Straight leg raise positive on the left. MRI shows disc desiccation at L4–5 and L5–S1.</p>
              <p><b>Neurologic.</b> Strength 5/5 in both lower extremities. Reflexes 2+ and symmetric.</p>
              <p><b>Apportionment.</b> <mark>25% of the lumbar spine impairment is apportioned to degenerative disc disease, as seen on MRI.</mark> The remaining 75% is industrial.</p>
              <p><i className="wlm-ln" style={{ width: '96%' }}></i><i className="wlm-ln" style={{ width: '88%' }}></i><i className="wlm-ln" style={{ width: '54%' }}></i></p>
            </div>
            <div className="wlm-pf"><span className="wlm-ok"><WlI n="shield-check" s={14} c="var(--ok)" />Issue tied to p.4</span><WLD.Button variant="primary" size="sm" style={{ marginLeft: 'auto' }}>Draft supplemental request</WLD.Button></div>
          </div>
        </div>
      </main>
    </div>
  );
}

function WlmSite() {
  return (
    <div className="wlm" style={{ width: 1440, height: 900, background: 'var(--obsidian)' }}>
      <WLD.ShardField opacity={.07} padding="0" style={{ height: '100%' }}>
        <div className="wlm-snav"><WLD.Logo inverse size={30} /><span>Product</span><span>Trust</span><span>Help</span><WLD.Button variant="default" style={{ marginLeft: 24 }}>Book a demo</WLD.Button></div>
        <div style={{ padding: '150px 96px 0', maxWidth: 1060 }}>
          <WLD.Kicker tone="onDark" size={13}>QME report review · California workers’ comp defense</WLD.Kicker>
          <h2 className="wlm-sh">Win the medical-legal fight before the MSC.</h2>
          <p className="wlm-sl">WilboLaw reads the file, shows what’s wrong on which page and drafts the letter that fixes it. A lawyer approves everything.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 40 }}><WLD.Button variant="default" style={{ height: 48, padding: '0 22px', fontSize: 15 }}>Book a demo</WLD.Button><WLD.Button variant="ghost" style={{ height: 48, padding: '0 22px', fontSize: 15, color: 'rgba(255,255,255,.68)' }}>Built to be checked</WLD.Button></div>
        </div>
      </WLD.ShardField>
    </div>
  );
}

function WlmTrust() {
  const P = [['Citation check', 'Every quote and page in a draft is checked against the case file.'], ['Lawyer’s yes', 'Nothing is sent anywhere on its own.'], ['Audit log', 'Every upload, issue, draft and approval is recorded.'], ['Firm isolation', 'Each firm’s data is kept separate.']];
  return (
    <div className="wlm" style={{ width: 560, background: '#fff', padding: 36 }}>
      <WLD.Kicker tone="accentText">Trust</WLD.Kicker>
      <h3 className="wlm-h" style={{ fontSize: 34, marginTop: 10 }}>Built to be checked.</h3>
      <div style={{ marginTop: 26, borderTop: '2px solid var(--ink)' }}>{P.map(([t, d], i) => <div key={t} className="wlm-pr"><span className="wlm-ref">{String(i + 1).padStart(2, '0')}</span><div><b>{t}</b><p>{d}</p></div></div>)}</div>
    </div>
  );
}

function WlmDemo() {
  return (
    <div className="wlm" style={{ width: 520, background: '#fff', padding: 36, display: 'grid', gap: 14 }}>
      <WLD.Kicker tone="accentText">Demo · 20 minutes</WLD.Kicker>
      <h3 className="wlm-h" style={{ fontSize: 30 }}>See it on one of your own QME reports.</h3>
      <p style={{ color: 'var(--ink-2)', margin: '0 0 6px' }}>Book 20 minutes and bring a report, redacted if you prefer.</p>
      <WLD.Input placeholder="Name" /><WLD.Input placeholder="Firm" /><WLD.Input placeholder="Work email" />
      <div className="wlm-drop"><WlI n="upload" c="var(--ink-3)" /><span>Add a QME report (optional)</span></div>
      <WLD.Button variant="primary" fullWidth style={{ height: 44 }}>Book 20 minutes</WLD.Button>
    </div>
  );
}

function WlmHelp() {
  const G = ['Add documents to the file', 'Review the issues', 'Draft a supplemental request', 'See what changed', 'Write a status report'];
  return (
    <div className="wlm" style={{ width: 520, background: '#fff', padding: 36, display: 'grid', gap: 18 }}>
      <WLD.Kicker tone="accentText">Help centre</WLD.Kicker>
      <h3 className="wlm-h" style={{ fontSize: 30 }}>One short guide per job.</h3>
      <WLD.Input placeholder="Search the guides" />
      <div style={{ borderTop: '2px solid var(--ink)' }}>{G.map(g => <div key={g} className="wlm-row" style={{ padding: '13px 0' }}><WlI n="file-text" c="var(--ink-3)" /><span style={{ flex: 1 }}>{g}</span><WlI n="chevron-right" s={14} c="var(--ink-4)" /></div>)}</div>
    </div>
  );
}

Object.assign(window, { WlI, WlmFile, WlmIssues, WlmDraft, WlmPlan, WlmCompare, WlmStatus, WlmToday, WlmExposure, WlmApp, WlmSite, WlmTrust, WlmDemo, WlmHelp });
