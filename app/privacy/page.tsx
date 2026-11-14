import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy policy | Qwabi Apps',
  description: 'How Qwabi Apps, including qSMS and qPhone, handle your data and Google user data.',
};

const sections: { title: string; body: string[] }[] = [
  {
    title: 'Who we are',
    body: [
      'Qwabi Apps (apps.qwabi.co.za) are Android apps built by Qwabi Engineering (Ayabonga Qwabi), South Africa. This policy covers qSMS, qPhone, qShare (the Android app and the Chrome extension) and the other apps listed on this site.',
    ],
  },
  {
    title: 'Data that stays on your phone',
    body: [
      'Your SMS messages, call history, contacts, blocking rules and app settings are stored on your phone. Qwabi does not upload them to its servers, except for the limited data described under "AI assistant" and "qShare and share rooms" when you choose to use those features.',
    ],
  },
  {
    title: 'Google sign-in',
    body: [
      'The AI assistant in qSMS and qPhone is off by default. If you turn it on, you sign in with Google. We receive your Google account email address, name and profile picture (the email, profile and openid scopes) so we can keep your assistant history separate from other users. Your account record is stored with our authentication provider, Supabase.',
    ],
  },
  {
    title: 'Google Drive backup (qSMS)',
    body: [
      'qSMS can back up your messages to your own Google Drive. It uses only the drive.appdata scope, which lets qSMS create and read its own backup file in a hidden app-data folder in your Drive. qSMS cannot see, open or change any other file in your Drive.',
      'The backup goes directly from your phone to Google Drive. Qwabi servers never receive, store or read your backup.',
      'To delete the backup, open Google Drive on the web, go to Settings, then Manage apps, find qSMS and choose "Delete hidden app data". You can also remove qSMS access at myaccount.google.com/permissions.',
    ],
  },
  {
    title: 'AI assistant',
    body: [
      'When you ask the assistant a question, your question and the limited phone data needed to answer it (for example, a small number of matching messages or recent calls that the app reads on your phone) are sent to Qwabi\'s assistant service on Google Cloud and processed by Groq, our language-model provider, to produce a reply.',
      'Assistant conversations are stored for your account for up to 30 days and are then deleted. You can clear them at any time with "Clear history" in the app. The assistant cannot change phone settings without you tapping Apply.',
    ],
  },
  {
    title: 'Google user data',
    body: [
      'Qwabi Apps\' use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.',
      'We use Google user data only to provide the features described above. We do not sell it, use it for advertising, or let people read it, except with your permission, for security or legal reasons, or where it is anonymised. We do not use it to train AI models.',
    ],
  },
  {
    title: 'qShare and share rooms',
    body: [
      'qShare (the Android app and the Chrome extension) can send files and text to another device. Sending over the same Wi-Fi or to a nearby phone goes straight from device to device and does not pass through Qwabi.',
      'Share rooms send through Qwabi\u2019s servers so the other person can fetch the file later. When you send a file or message in a room, it is stored with our storage provider, Supabase, until it expires: files and messages are deleted 3 days after they are sent, and a room is closed 3 days after its last activity. Anyone who has a room\u2019s code can join it and see what is in it, so share the code only with people you trust.',
      'A room has no account. Joining creates a random key that is saved on your device and proves you belong to the room. We keep a hash of that key, your device\u2019s display name and the time you were last active in the room, for as long as the room exists. We also use your network address, in hashed form, to limit how many rooms one person can create or guess in an hour.',
      'The Chrome extension keeps your room codes, room keys and device name in your browser\u2019s local extension storage. It does not read your browsing, tabs or history, and it sends nothing until you choose to send it.',
    ],
  },
  {
    title: 'Sharing',
    body: [
      'We do not sell your personal information. Service providers that process data for us are Google (Cloud Run hosting, Google sign-in and Drive), Supabase (sign-in, assistant history and share rooms) and Groq (assistant replies). They may process data outside South Africa under their own terms.',
    ],
  },
  {
    title: 'Your choices and rights',
    body: [
      'You can turn the assistant off, sign out, clear its history, or stop using Drive backup at any time in the app. Under POPIA you may ask us to access, correct or delete personal information we hold about you, including your assistant account. Email aya@qwabi.co.za with the subject "Qwabi Apps privacy request".',
    ],
  },
  {
    title: 'Changes',
    body: ['We will update this page when our practices change and note the date below.'],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Qwabi Apps</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Privacy policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: 14 November 2026</p>
      {sections.map(section => (
        <section key={section.title} className="mt-10">
          <h2 className="text-xl font-semibold">{section.title}</h2>
          {section.body.map(text => (
            <p key={text.slice(0, 40)} className="mt-3 leading-7 text-muted-foreground">{text}</p>
          ))}
        </section>
      ))}
    </div>
  );
}
