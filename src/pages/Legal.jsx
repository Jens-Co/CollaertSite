import './../App.css';

function LegalLayout({ title, updated, crossLabel, crossHref, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-5 flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center font-display font-bold text-white text-sm">
              JC
            </span>
            <span className="font-display font-semibold text-slate-900">Jens Collaert</span>
          </a>
          <a href="#brickbreak" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            ← Brick Break Swipe
          </a>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-5 pt-14 pb-24">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 mb-3">
            Brick Break Swipe
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-400">Last updated: {updated}</p>
          <div className="legal-prose mt-8 text-slate-600 leading-relaxed">{children}</div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-8 px-5 bg-slate-50">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
          <span>© {new Date().getFullYear()} Jens Collaert IT Services · KBO 1025.363.838</span>
          <a href={crossHref} className="text-blue-600 hover:underline">{crossLabel}</a>
        </div>
      </footer>
    </div>
  );
}

export function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="9 July 2026"
      crossLabel="Terms of Service"
      crossHref="#/brickbreak/terms"
    >
      <p>
        Brick Break Swipe ("the game", "we", "us") is developed by Jens Collaert IT Services.
        This policy explains what data the game handles and why. We designed the game to collect
        as little as possible.
      </p>

      <h2>Playing without an account</h2>
      <p>
        You can play the entire game without signing in. Your progress (levels, coins, hearts,
        cosmetics) is stored <strong>only on your device</strong>.
      </p>

      <h2>Optional online features</h2>
      <p>
        If you use leaderboards, friends, or sign in, the game creates an anonymous player record
        on our server containing:
      </p>
      <ul>
        <li>A randomly generated player token (kept on your device).</li>
        <li>A nickname you choose (you may change it at any time).</li>
        <li>A friend code, so friends can add you.</li>
        <li>Your rush and daily scores, for the leaderboards.</li>
        <li>An optional backup snapshot of your in-game progress, so you can restore it on another device.</li>
      </ul>
      <p>
        We do <strong>not</strong> collect your name, email address, phone number, contacts,
        precise location, or device advertising identifiers for our own use.
      </p>

      <h3>Sign in with Apple / Google</h3>
      <p>
        If you sign in (with Apple on iOS, or with Google on Android), we only use the provider's
        anonymous user identifier (a random string) to link your progress to your Apple or Google
        account, so it survives a reinstall or new device. If the provider includes any basic
        profile information (such as your name or email) with the sign-in, we discard it and{' '}
        <strong>never</strong> store it.
      </p>

      <h2>Purchases</h2>
      <p>
        In-app purchases are processed by the platform store (<strong>Apple App Store</strong> or{' '}
        <strong>Google Play</strong>) and managed through <strong>RevenueCat</strong>, which
        validates receipts. We never see or store your payment details.
      </p>

      <h2>Advertising</h2>
      <p>
        The game shows <strong>rewarded ads</strong> (which you choose to watch) via{' '}
        <strong>Google AdMob</strong>. AdMob may process device data to serve ads in accordance
        with <a href="https://policies.google.com/privacy">Google's policies</a>. We do not run
        forced or personalized-profiling ads for children.
      </p>

      <h2>Third parties</h2>
      <ul>
        <li><strong>Apple</strong> - Sign in with Apple, in-app purchases (iOS).</li>
        <li><strong>Google</strong> - Sign-In (Android), in-app purchases via Google Play, and AdMob rewarded ads.</li>
        <li><strong>RevenueCat</strong> - purchase validation.</li>
        <li><strong>Our own server</strong> (hosted in the EU) - leaderboards, friends, backup.</li>
      </ul>

      <h2>Data retention &amp; deletion</h2>
      <p>
        You can permanently delete your account at any time from <strong>Profile → Delete
        account</strong> in the game. This:
      </p>
      <ul>
        <li>removes your player record, scores, friendships, and cloud backup from our server, and</li>
        <li>
          erases all game progress stored <strong>locally on your device</strong> (levels, coins,
          cosmetics - everything), resetting the game to its first-launch state.
        </li>
      </ul>
      <p>Deleting the app also removes any locally stored progress.</p>

      <h2>Children</h2>
      <p>
        The game is suitable for all ages and does not knowingly collect personal information from
        children. Ads shown are not personalized.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email <a href="mailto:support@mccompanion.net">support@mccompanion.net</a>.
      </p>
    </LegalLayout>
  );
}

export function Terms() {
  return (
    <LegalLayout
      title="Terms of Service"
      updated="9 July 2026"
      crossLabel="Privacy Policy"
      crossHref="#/brickbreak/privacy"
    >
      <p>
        Welcome to Brick Break Swipe ("the game"), developed by Jens Collaert IT Services ("we",
        "us"). By downloading or playing the game you agree to these Terms. If you do not agree,
        please do not use the game.
      </p>

      <h2>1. Licence to play</h2>
      <p>
        We grant you a personal, non-exclusive, non-transferable, revocable licence to install and
        play the game for your own private entertainment. You may not copy, modify,
        reverse-engineer, resell, or redistribute the game or its content except as allowed by
        applicable law or the app store's terms.
      </p>

      <h2>2. Your account</h2>
      <p>
        Playing is possible without an account. If you use the online features (leaderboards,
        friends, cloud backup) an anonymous account is created for you. You are responsible for the
        activity under your account and for choosing a nickname that is not offensive, misleading,
        or infringing.
      </p>
      <p>
        You can delete your account at any time from <strong>Profile → Delete account</strong>,
        which permanently removes your online data and resets local progress.
      </p>

      <h2>3. Fair play &amp; conduct</h2>
      <p>You agree not to:</p>
      <ul>
        <li>cheat, use bots, tamper with the game, or submit falsified scores;</li>
        <li>attempt to disrupt, overload, or gain unauthorised access to our servers;</li>
        <li>choose nicknames or interact with other players in a way that is abusive, hateful, harassing, or unlawful.</li>
      </ul>
      <p>
        We may remove scores, reset nicknames, or suspend accounts that break these rules, to keep
        leaderboards and friends fair for everyone.
      </p>

      <h2>4. Virtual items &amp; purchases</h2>
      <p>
        The game includes virtual items (coins, hearts, cosmetics, boosters). These have{' '}
        <strong>no real-world monetary value</strong>, cannot be exchanged for cash, and are
        licensed to you, not sold. Purchases of virtual items are final except where a refund is
        required by law or the platform store's policy. In-app purchases are handled by the{' '}
        <strong>Apple App Store</strong> or <strong>Google Play</strong>; their terms and refund
        policies apply.
      </p>

      <h2>5. Advertisements</h2>
      <p>
        The game may show <strong>rewarded ads</strong> that you choose to watch in exchange for
        in-game rewards. Ads are provided by Google AdMob and are subject to{' '}
        <a href="https://policies.google.com/privacy">Google's policies</a>.
      </p>

      <h2>6. Availability &amp; changes</h2>
      <p>
        We may update, change, or discontinue the game or its online features at any time, including
        for maintenance. We are not liable for temporary unavailability or for loss of progress that
        was not backed up.
      </p>

      <h2>7. Disclaimer &amp; liability</h2>
      <p>
        The game is provided "as is" without warranties of any kind. To the maximum extent permitted
        by law, we are not liable for indirect or consequential damages arising from your use of the
        game. Nothing in these Terms limits rights you have as a consumer that cannot be waived under
        applicable law.
      </p>

      <h2>8. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the game after an update means
        you accept the revised Terms. The "last updated" date above shows the current version.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these Terms? Email <a href="mailto:support@mccompanion.net">support@mccompanion.net</a>.
      </p>
    </LegalLayout>
  );
}
