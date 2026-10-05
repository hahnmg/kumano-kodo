..  _customization:

=============
Customization
=============

Own files
=========

The site settings in the category Own files take a stylesheet and a script, loaded after the theme, and a template
folder ahead of the theme's. The folder mirrors `Resources/Private/Templates/` (`Pages/`, `Layouts/`, `Partials/`,
`Content/`); a file there replaces the theme's file of the same name. A path that cannot be resolved is skipped.

Own content elements
====================

Register the CType in your own extension as `Configuration/TCA/Overrides` does here, with the `kumanoHeading_*`
palettes and the tab order General, Images, Appearance. Put its template in your template folder under `Content/` and
render it through the `Kumano/Section` partial so it gets the section frame.

Logo
====

Caramel shows the classic mark, the other themes the modern one. An editor can upload another on the home page (tab
Appearance); an SVG takes the theme colours when its groups are named `bird` and `text`.
