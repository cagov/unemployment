Usage note: [only the "br", "strong", "i", and "p" tags](https://react.i18next.com/latest/trans-component#using-for-less-than-br-greater-than-and-other-simple-html-elements-in-translations-v-10-4-0) can be used in translation.json.
(Oddly, "em" isn't supported.)

Other tags must be converted. One way is to delete the key from translation.json,
load the page, and copy the console output with converted
tags back into translation.json. Other ways [are described in the docs](https://react.i18next.com/latest/trans-component#how-to-get-the-correct-translation-string).

A strange warning: in the JSX, if a `<Trans>` component contains a link it
cannot be left empty like most `<Trans>` components; the length of the
contents must _approximately_ match the corresponding value in translation.json,
otherwise the link won't render. It's unclear how similar it must be;
deleting all but a few words of the text in `<Trans>` won't work,
whereas deleting half does. Since Spanish translations are generally
of somewhat similar length, this shouldn't be an issue in practice.
