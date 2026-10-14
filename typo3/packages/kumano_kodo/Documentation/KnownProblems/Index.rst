..  _known-problems:

==============
Known problems
==============

fluid_styled_content and lib.contentElement
    Like any sitepackage the theme defines `lib.contentElement`. Its set loads
    fluid_styled_content first, so a set depending on it cannot replace ours
    (`forge.typo3.org/issues/109670 <https://forge.typo3.org/issues/109670>`__).
    If another set replaces it anyway, each element shows "Oops, an error
    occurred!".

Japanese texts
    The Japanese texts of the demo and the interface have not been checked by a
    native speaker.
