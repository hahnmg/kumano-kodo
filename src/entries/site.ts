import { bindMenuToggle } from '../scripts/menu-toggle';
import { bindNavFlyouts } from '../scripts/nav-flyout';
import { bindSchemeToggle, syncSchemeToggles } from '../scripts/scheme-toggle';
import { bindStickyHeader, syncStickyHeaders } from '../scripts/sticky-header';

bindSchemeToggle(document);
bindMenuToggle(document);
bindNavFlyouts(document);
bindStickyHeader(window);
syncSchemeToggles(document);
syncStickyHeaders(window);
