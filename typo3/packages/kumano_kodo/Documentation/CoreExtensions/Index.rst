..  _core-extensions:

===============
Core extensions
===============

The theme renders these in its own markup when they are installed.

Search (indexed_search)
    A magnifier in the header opens the search; results show like the Media List. The header finds the search page by
    its plugin, or by the setting Search page.

Login (felogin)
    The Login Form with its failed and logged-in states. Redirect after login and logout through the plugin's
    redirect settings; the logout goes straight to the logout target.

Forms (form)
    Fields, errors and the button from the theme's atoms; the confirmation shows as an Info Box. Validation messages
    come in the site's language. The theme ships a plain contact form (name, email, message, consent) to pick in the
    form plugin.

Sitemap (seo)
    `/sitemap.xml`. Pages with "No index" stay out. Absolute URLs need a site base with a host.
