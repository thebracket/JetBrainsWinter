// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="01_advanced_hands_on_rust.html"><strong aria-hidden="true">1.</strong> Advanced Hands-on Rust</a></li><li class="chapter-item expanded "><a href="02_cpp_java_csharp.html"><strong aria-hidden="true">2.</strong> What do you see as the biggest mindset shift developers need to make when coming to Rust from C++, Java, or C#?</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="02_cpp_java_csharp_1.html"><strong aria-hidden="true">2.1.</strong> No Runtime!</a></li><li class="chapter-item expanded "><a href="02_cpp_java_csharp_2.html"><strong aria-hidden="true">2.2.</strong> Stack vs Heap</a></li><li class="chapter-item expanded "><a href="02_cpp_java_csharp_3.html"><strong aria-hidden="true">2.3.</strong> The Heap</a></li><li class="chapter-item expanded "><a href="02_cpp_java_csharp_4.html"><strong aria-hidden="true">2.4.</strong> Oopsies</a></li><li class="chapter-item expanded "><a href="02_cpp_java_csharp_5.html"><strong aria-hidden="true">2.5.</strong> Let&#39;s Get Racy</a></li><li class="chapter-item expanded "><a href="02_cpp_java_csharp_6.html"><strong aria-hidden="true">2.6.</strong> Performance</a></li></ol></li><li class="chapter-item expanded "><a href="03_learning_curve.html"><strong aria-hidden="true">3.</strong> Is Rust’s steep learning curve still a problem in 2025, or has the ecosystem matured enough to ease newcomers in?</a></li><li class="chapter-item expanded "><a href="04_adoption.html"><strong aria-hidden="true">4.</strong> Will Rust gain widespread adoption in 2026?</a></li><li class="chapter-item expanded "><a href="05_borrowing.html"><strong aria-hidden="true">5.</strong> What’s ownership and borrowing? Why do we need these things in Rust? What’s the best way to really “get” them?</a></li><li class="chapter-item expanded "><a href="06_zero_cost.html"><strong aria-hidden="true">6.</strong> What does Rust mean by “zero-cost abstractions”?</a></li><li class="chapter-item expanded "><a href="07_iterators.html"><strong aria-hidden="true">7.</strong> Do I need to use iterators whenever possible, or is writing a loop just as fine?</a></li><li class="chapter-item expanded "><a href="08_async_speed.html"><strong aria-hidden="true">8.</strong> How quickly should I master writing async code if I want to develop real projects?</a></li><li class="chapter-item expanded "><a href="09_exceptions.html"><strong aria-hidden="true">9.</strong> Why are there no throwing and catching exceptions in Rust?</a></li><li class="chapter-item expanded "><a href="10_result_option.html"><strong aria-hidden="true">10.</strong> Why does Rust have both Result and Option types – how do I know which one to use?</a></li><li class="chapter-item expanded "><a href="11_extern_crate.html"><strong aria-hidden="true">11.</strong> Which external crate should I learn about first?</a></li><li class="chapter-item expanded "><a href="12_struct_enum_trait.html"><strong aria-hidden="true">12.</strong> How do I choose between using structs, enums, and traits when modeling data and behavior in Rust?</a></li><li class="chapter-item expanded "><a href="13_patterns.html"><strong aria-hidden="true">13.</strong> How do I understand and use pattern matching effectively, and why is it so central in Rust?</a></li><li class="chapter-item expanded "><a href="14_lifetimes.html"><strong aria-hidden="true">14.</strong> What’s the simplest way to understand lifetimes without getting stuck on the syntax?</a></li><li class="chapter-item expanded "><a href="15_smart_ptr_reference.html"><strong aria-hidden="true">15.</strong> When should I use references (&amp;T) versus smart pointers like Box or Rc?</a></li><li class="chapter-item expanded "><a href="16_copy_clone_other.html"><strong aria-hidden="true">16.</strong> How do I know when my struct should be Copy, Clone, or neither?</a></li><li class="chapter-item expanded "><a href="17_immutable.html"><strong aria-hidden="true">17.</strong> Why does Rust emphasize immutability by default, and when is mutability the right choice?</a></li><li class="chapter-item expanded "><a href="18_best_practices.html"><strong aria-hidden="true">18.</strong> What are some best practices for organizing Rust projects – modules, files, and workspace structure?</a></li><li class="chapter-item expanded "><a href="19_macros.html"><strong aria-hidden="true">19.</strong> What are macros in Rust, and when should a beginner actually use them?</a></li><li class="chapter-item expanded "><a href="20_features.html"><strong aria-hidden="true">20.</strong> How do Cargo features work, and when should beginners start using them?</a></li><li class="chapter-item expanded "><a href="21_rusty_rustacean.html"><strong aria-hidden="true">21.</strong> How can I tell whether my Rust code is idiomatic, and what resources help beginners write more “Rusty” code?</a></li><li class="chapter-item expanded "><a href="22_tooling.html"><strong aria-hidden="true">22.</strong> What tools or workflows should beginners adopt early to make Rust development smoother (formatting, linting, testing)?</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
