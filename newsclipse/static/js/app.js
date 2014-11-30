// ===================================================================
// Models
// ===================================================================

App.Card = Backbone.Model.extend({ 

});

App.Story = Backbone.Model.extend({ 

});

// ===================================================================
// Collections
// ===================================================================

App.StoriesCollection = Backbone.Collection.extend({
    model: App.Story,
    url: "/api/stories",
    comparator: 'title'
});

App.Stories = new App.StoriesCollection(STORIES);

App.StoryCardsCollection = Backbone.Collection.extend({
    model: App.Card,
    //url: "/api/stories/id/cards",
    comparator: '' // Order of appearance in the story
});

App.StoryCards = new App.StoryCardsCollection({

});

App.CardsCollection = Backbone.Collection.extend({
    model: App.Card,
    url: "/api/cards",
    comparator: 'title'
});

// ===================================================================
// Views
// ===================================================================
// Site-wide views
App.HeaderView = Backbone.View.extend({
    template: "header",
    events: {
    }
});

App.FooterView = Backbone.View.extend({
    template: "footer",
    events: {
    }
});

App.StoryListItemView = Backbone.View.extend({
    model: App.Story,
    storyId: '',
    initialize: function() {
        console.log('Story list item view initalized...');
        this.storyId = this.model.get('_id');
    },
    template: "story-list-item",
    events: {
        // Listen for a click anywhere on the sub-view
        "click": "viewStoryDetail"
    },
    viewStoryDetail: function() { 
        App.router.navigate("story/" + this.storyId, {
            trigger: true
        });
    }
});

App.StoryListView = Backbone.View.extend({
    collection: App.Stories,
    initialize: function() {
        console.log('Story list view initalized...');
    },
    serialize: function() {
        return {
            stories: this.collection
        };
    },
    template: "story-list",
    events: {
    },
    beforeRender: function() {
        // Add the subviews to the view
        this.collection.each(function(story) {
            this.insertView("#stories-list", new App.StoryListItemView({
                model: story
            }));
        }, this);
    },
});

App.CardListItemView = Backbone.View.extend({
    model: App.Card,
    cardId: '',
    initialize: function() {
        console.log('Card list item view initalized...');
        this.cardId = this.model.get('_id');
    },
    template: "card-list-item",
    events: {
        // Listen for a click anywhere on the sub-view
        "click": "viewCardDetail"
    },
    viewCardDetail: function() { 
        App.router.navigate("card/" + this.cardId, {
            trigger: true
        });
    }
});

App.CardEditorView = Backbone.View.extend({
    collection: App.StoryCards,
    initialize: function() {
        console.log('Card editor view initalized...');
    },
    template: "card-editor",
    events: {
    },
    beforeRender: function() {
        // Add the subviews to the view
        this.collection.each(function(card) {
            this.insertView("#card-list", new App.CardListItemView({
                model: card
            }));
        }, this);
    }
});

App.StoryView = Backbone.View.extend({
    initialize: function() {
        console.log('Story view initalized...');
    },
    views: {
        "#card-editor": new App.CardEditorView(),
    },
    template: "story-editor",
    events: {
    }
});

App.CardsView = Backbone.View.extend({
    initialize: function() {
        console.log('Cards view initialized...');
    },
    template: "card-editor",
    events: {
    }
});

App.DefaultView = Backbone.View.extend({
    template: "default",
    initialize: function(options) {
    },
    beforeRender: function() {
        //console.log('Adding child views...');
        //this.insertView("#story", new App.StoryView() );
        //this.insertView("#cards", new App.CardsView() );
    },
    events: {
    }
});
