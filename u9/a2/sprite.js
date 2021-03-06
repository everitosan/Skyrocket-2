var FrameTimer = function() {
    this._lastTick = (new Date()).getTime();
};

FrameTimer.prototype = {
    getSeconds: function() {
        var seconds = this._frameSpacing / 1000;
        if(isNaN(seconds)) {
            return 0;
        }

        return seconds;
    },

    tick: function() {
        var currentTick = (new Date()).getTime();
        this._frameSpacing = currentTick - this._lastTick;
        this._lastTick = currentTick;
    }
};

var SpriteSheet = function(data) {
    this.load(data);
};

SpriteSheet.prototype = {
    _sprites: {},
    _width: 0,
    _height: 0,

    load: function(data) {
        this._height = data.height;
        this._width = data.width;
        this._sprites = data.sprites;
    },

    getOffset: function(spriteName) {
        for(var i = 0, len = this._sprites.length; i < len; i++) {
            var sprite = this._sprites[i];

            if(sprite.name == spriteName) {
                return {
                    x: (sprite.x||0),
                    y: (sprite.y||0),
                    px: (sprite.px||0),
                    py: (sprite.py||0),
                    width: this._width,
                    height: this._height
                };
            }
        }
        
        return null;
    }
}

var Animation = function(data, sprites) {
    this.load(data);
    this._sprites = sprites;
};

Animation.prototype = {
    _frames: [],
    _frame: null,
    _frameDuration: 0,

    load: function(data) {
        this._frames = data;
        this._frameIndex = 0;
        this._frameDuration = data[0].time;
    },

    animate: function(deltaTime) {
        this._frameDuration -= deltaTime;

        if(this._frameDuration <= 0) {
            this._frameIndex++;
            if(this._frameIndex == this._frames.length) {
                this._frameIndex = 0;
            }

            this._frameDuration = this._frames[this._frameIndex].time;
        }
    },

    getSprite: function() {
        return this._sprites.getOffset(this._frames[this._frameIndex].sprite);
    }
};