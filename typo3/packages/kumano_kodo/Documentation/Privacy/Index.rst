..  _privacy:

=======
Privacy
=======

What the theme sends where. This describes the theme, not a legal assessment;
whether a site needs a consent banner depends on everything else it runs.

Fonts
=====

The typefaces are Google Fonts, downloaded once by the server into `typo3temp/`
and delivered from the site itself. Visitors never contact Google.

Videos
======

Own video files (MP4, WebM) play from the site; the player loads only when the
play button is pressed.

YouTube and Vimeo videos ask first. A click on play shows a short note on what
the provider receives, a link to the privacy policy (site setting :ref:`Privacy
policy <site-settings>`) and a box to load external videos without asking from
then on. Only "Load video" fetches the player. YouTube runs from
`youtube-nocookie.com`, the core's default.

A ticked box is stored in the browser (`localStorage`, no cookie). The content
element External videos shows the stored answer and takes it back; put it on the
privacy page.

No tracking
===========

The theme sets no cookies of its own and loads no analytics, maps or fonts from
other servers. A site that adds such services adds the consent handling they
need.
