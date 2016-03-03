# Website Performance Optimization

This project is intended to demonstrate optimizations that I have learnt for declogging the Critical Rendering Path of a website and smoothing included browser animations.

## Inspecting Performance

Following the structure frequently seen in web development, this project has two copies of the source code. First is the `src` (short for _source_) folder where the code rests in human-readable format. The other is `dist` (short for _distribution_) which incorporates all modifications that eliminate typical bottlenecks in the loading and rendering of a web page/application.

_Grunt_, a JS task runner is used to automate the common changes required to improve the performance of a website. Its ecosystem consists of multiple plugins that can perform tasks like minification, compression, linting, etc.

Basic steps for using Grunt with reference to getting this project running are discussed here. For further details, please refer to Grunt's official [Getting Started](http://gruntjs.com/getting-started) guide..

The `dist` version of the source code has been created using _Grunt_. If you wish to evaluate this version, follow only those steps that have been _italicized_. If you wish to 're-grunt' the project before evaluation, run through all the following steps:

1. _Download the ZIP of this project and extract it._
2. If not already available, download the relevant `npm` installer from [here](https://nodejs.org/en/download/). [Note: `npm` is best acquired as part of the `Node.js` bundle whose installer has been linked.]
3. Open a terminal/CMD prompt and install Grunt by keying in:

        npm install -g grunt-cli
4. _Start/restart the terminal/CMD prompt and navigate to the directory where the ZIP downloaded above was extracted._
5. Copy the file `pizzeria.jpg` from the directory `<ZIP_location>/views/images` to some other location, say Desktop. This step is required because, based on the discussion on [this](https://discussions.udacity.com/t/grunt-contrib-imagemin-plugin-not-optimizing-images/35478) thread, there seems to be some corruption in this image file that Grunt's `imagemin` plugin cannot handle. So this image, which has been compressed using some other software, will be placed back in its location after 'grunting'.
6. Run the following command:

        grunt --force -v
The `--force` compels Grunt to complete all its tasks regardless of whether one or more of them fail. `-v` is for being verbose with the results of grunting.
7. Now copy back `pizzeria.jpg` to `<ZIP_location>/views/images'.
8. In addition to the image issue, checks with Google Pagespeed with `ngrok` will fail due to a bug in the latter which has been discussed in detail [here](https://github.com/inconshreveable/ngrok/issues/243).
9. _Start a simple server entering the following in terminal/prompt:_

        python -m SimpleHTTPServer 8080
_Note: For Windows users, if Python is not installed, steps to acquire and install it are detailed [here](http://docs.python-guide.org/en/latest/starting/install/win/)._
10. _Download and install the appropriate `ngrok` from [this](https://ngrok.com/download) link._
11. _Open a new terminal/CMD prompt instance and key in:_

        ngrok http 8080
_This will give out a public link to the running server under the property *Forwarding* (http). Copy the link._
12. _Open a web browser and visit Google Pagespeed Insights:_

        https://developers.google.com/speed/pagespeed/insights/
_Enter the copied URL and hit *Analyze*. A desktop and mobile score of 95 and 94 out of 100 is expected._
13. _To examine rendering improvements, visit the following link and investigate its timeline and the browser console._

        localhost:8080/views/pizza.html

## Enhancements in Brief

### Portfolio Page

- Minified all HTML, CSS, and JS files using Grunt (`htmlmin`, `cssmin`, and `uglify` respectively).
- Reduced image sizes using Grunt (`imagemin`) and online tools.
- Placed styles relating to printing in a separate file called `print.css`.
- Ensured that print styles do not block DOM rendering by adding the attribute `media=print` in its `link` tag.
- Moved remaining CSS to HTML as these styles are only used by `index.html`.

### Cam's Pizzeria

_Note: All modifications are in the file `dist/views/js/main.js`_

- Pizza sizes, which can be toggled between Small, Medium, and Large, are set in percentage rather than absolute pixel values.
- While updating positions of background pizzas, the HTML `body` attribute called `scrollTop` is extracted before the loop for updation begins.
- When background pizzas are added for the first time, their position is set as part of the constructor function rather than calling `updatePositions`.
- Styles shared by background pizzas are defined in the `style.css` file rather than the constructor function.
- As background pizzas are the only bits that are animated while scrolling, they are suggested for a separate layer to the browser by adding the `will-change: transform;` property to their class.

## Contact

For any clarifications or suggestions, please drop me an email at [kaletejas2006@gmail.com](mailto:kaletejas2006@gmail.com).
