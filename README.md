# Website Performance Optimization

This project is intended to demonstrate optimizations that I have learnt for declogging the Critical Rendering Path of a website and smoothing included browser animations.

## Inspecting Performance

Following the structure frequently followed in web development, this project has two copies of the source code. First is the `src` (short for _source_) folder where the code rests in human-readable format. The other is `dist` (short for _distribution_) which incorporates all modifications that eliminate typical bottlenecks in the loading and rendering of a web page/application.

_Grunt_, a JS task runner is used to automate the common changes required to improve the performance of a website. Its ecosystem consists of multiple plugins that can perform tasks like minification, compression, linting, etc.

Basic steps for using Grunt with reference to getting this project running are discussed here. For further details, please refer to the **Getting Started** guide [here](http://gruntjs.com/getting-started).

While this repository comes with a `dist` version of the source code which has been created using _Grunt_, a 're-grunting' is suggested with the following steps:

1. If not already available, download the relevant `npm` installer from [here](https://nodejs.org/en/download/). [Note: `npm` is best acquired as part of the `Node.js` bundle whose installer has been linked.]
2. Open a terminal/CMD prompt and install Grunt by keying in:
```
npm install -g grunt-cli
```
3. Download the ZIP of this project and extract it.
4. Restart the terminal/CMD prompt and navigate to the directory where the ZIP downloaded above was extracted.
5a. Copy the file `pizzeria.jpg` from the directory `<ZIP_location>/views/images` to some other location, say Desktop. This step is required because, based on the discussion on [this](https://discussions.udacity.com/t/grunt-contrib-imagemin-plugin-not-optimizing-images/35478) thread, there seems to be some corruption in this image file that Grunt's `imagemin` plugin cannot handle. So this image, which has been compressed using some other software, will be placed back in its location after 'grunting'.
5. Run the following command:
```
grunt --force -v
```
The `--force` compels Grunt to complete all its tasks regardless of whether one or more of them fail. `-v` is for being verbose with the results of grunting.
5b. Now copy back `pizzeria.jpg` to `<ZIP_location>/views/images'.
5c. In addition to the image issue, checks with Google Pagespeed with `ngrok` will fail due to a bug in the latter which has been discussed in detail [here](https://github.com/inconshreveable/ngrok/issues/243).
6. Start a simple server entering the following in terminal/prompt:
```
python -m SimpleHTTPServer 8080
```
Note: For Windows users, if Python is not installed, steps to acquire and install it are detailed [here](http://docs.python-guide.org/en/latest/starting/install/win/).
7. Download and install the appropriate `ngrok` from [this](https://ngrok.com/download) link.
8. Open a new terminal/CMD prompt instance and key in:
```
ngrok http 8080
```
This will give out a public link to the running server under the property _PROPERTYNAME_. Copy the link.
9. Open a web browser and visit Google Pagespeed Insights:
```
https://developers.google.com/speed/pagespeed/insights/
```
Enter the copied URL and hit _Analyze_. A desktop and mobile score of 95 and 94 out of 100 is expected.
10. To examine rendering improvements, visit the following link and investigate its timeline and the browser console.
```
localhost:8080/views/pizza.html
```

## Enhancements in Brief