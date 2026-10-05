..  _installation:

============
Installation
============

Require the theme, and the demo if you want content:

..  code-block:: bash

    composer require kumano-kodo/sitepackage
    composer require kumano-kodo/demo

Add the site set **Kumano Kodo** (`kumano-kodo/site`) to your site. It loads fluid_styled_content, felogin,
indexed_search, form and the sitemap of seo before itself where they are installed; none of them is required.

Every page needs one of the theme's page layouts (Default, Landing, Journal, Classic). Set one on the root page and
as layout for the subpages; a page without layout falls back to Default.

Demo or starter set
===================

Installing the demo package imports the full journal. To begin with five pages to replace instead (home, about us,
contact, imprint, privacy):

..  code-block:: bash

    vendor/bin/typo3 kumano:demo:build --replace --starter

In the DDEV setup of the repository, set `KUMANO_DEMO=starter` before the first `ddev start` to get the starter set
right away.
