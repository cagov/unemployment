1. A description of the changes proposed in this pull request. 
     * Include images/GIFs if helpful for reviewers. Try Fireshot ([Chrome](https://chrome.google.com/webstore/detail/take-webpage-screenshots/mcbpblocgmgfnpjjppndjkmgjaogfceg?hl=en), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/fireshot/)) for full-page screenshots and LICEcap ([MacOS](https://www.cockos.com/licecap/)) for GIFs.
2. A [reference to the related Github Issue(s)](https://help.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue), e.g. "fixes #29"
3. Before submitting the PR for review, consider the checklist below and check off any completed items

===

Resolves #XXX

- [ ] Snapshots updated, if output HTML/JS has changed (`npm run test:update-snapshots`)
- [ ] Changes reviewed on mobile using devtools, if output HTML/CSS has changed
- [ ] Automated tests added, if new functionality added
- [ ] Documentation (e.g. READMEs) updated, if relevant
- [ ] IE11 and Edge compatibility confirmed via manual testing in Browserstack, if new libraries added or newish JS/HTML/CSS features used for the first time in this codebase
- [ ] Accessibility & performance audit run using Google Lighthouse, if major changes made
