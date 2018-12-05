import videojs from "video.js";
import {
  version as VERSION
} from "../package.json";

const Plugin = videojs.getPlugin("plugin");

// Default options for the plugin.
const defaults = {
  previewEnd: 120,
  previewEndBanner: "https://res.cloudinary.com/keyport/image/upload/v1543908800/preview_ended_poster.jpg"
};

var preview = {};
/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class Preview extends Plugin {
  /**
   * Create a Preview plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player);

    this.options = videojs.mergeOptions(defaults, options);
    preview = this.options;

    this.player.ready(() => {
      this.player.on("timeupdate", this.onTimeUpdate);
    });
  }

  onTimeUpdate() {
    if (this.currentTime() > (preview.previewEnd - 4)) {
      let volume = this.volume();
      volume = volume - ((volume * 25) / 100);
      this.volume(volume);
    }
    if (this.currentTime() > preview.previewEnd) {
      this.reset();
      this.poster(preview.previewEndBanner);
      this.exitFullscreen();
      this.bigPlayButton.hide();
    }
  }
}

// Include the version number.
Preview.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin("preview", Preview);

export default Preview;
