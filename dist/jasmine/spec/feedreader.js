/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('ensures allFeeds has URL defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toMatch(/[Aa0-Za9+]/);
            });
        });

        it('ensures allFeeds has name defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).toMatch(/[Aa0-Za9+]/);
            });
        });
    });

    describe('The Menu', function() {
        it('ensures the menu element is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('ensures the menu changes visibility when the menu icon is clicked', function () {
            $('.menu-icon-link').click();
             expect($('body').hasClass('menu-hidden')).toBe(false);
             $('.menu-icon-link').click();
             expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('ensures there is at least a single .entry element within the .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        var prevFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                prevFeed = $('.feed').html();

                loadFeed(1, done);
            });
        });

        it('ensures when a new feed is loaded by the loadFeed function that the content actually changes.', function () {
            expect($('.feed').html()).not.toBe(prevFeed);
        });
    });
}());
