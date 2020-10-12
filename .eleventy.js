const moment = require('moment');
moment.locale('en');
const now = new Date();
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
// dev = global.dev = (process.env.ELEVENTY_ENV === 'development'),



module.exports = function (eleventyConfig) {

};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addWatchTarget("./src/sass")
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy('./src/js');
  eleventyConfig.addPassthroughCopy("./src/img");

  eleventyConfig.addFilter("randomItem", (arr) => {
    arr.sort(() => {
      return 0.5 - Math.random();
    });
    return arr.slice(0, 1);
  });
  //date format
  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });
  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('Do MMMM, YYYY'); // E.g. May 31, 2019
  });
  // format word count and reading time
  eleventyConfig.addFilter('readtime', require('./lib/filters/readtime'));

  // post collection (in src/blog)
  eleventyConfig.addCollection('post', collection =>

    collection
    .getFilteredByGlob('./src/blog/*.md')
    .filter(p => (!p.data.draft && p.date <= now))
    // .filter(p => dev || (!p.data.draft && p.date <= now))
  );

  // post collection (in src/snippets)
  eleventyConfig.addCollection('snippet', collection =>
    collection
    .getFilteredByGlob('./src/snippets/*.md')
  );

  // tags 
  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function (item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "post":
            case "posts":
            case "tagList":
            case "featured":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });
        
    return [...tagSet];
  });




  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};