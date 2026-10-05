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

Content comes from one of two packages; they exclude each other.

`kumano-kodo/demo`
    The full trail journal.

`kumano-kodo/starter`
    Five pages with placeholder texts to replace (home, about us, contact, imprint, privacy), the footer and the
    theme's contact form.

..  code-block:: bash

    composer require kumano-kodo/starter

Both are TYPO3 distributions: without Composer, the installer offers them as content to import during setup.
