const moment = require('moment');
moment.locale('en');
const now = new Date();
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addWatchTarget("./src/sass");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy('./src/js');
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addFilter("randomItem", (arr) => {
    arr.sort(() => {
      return 0.5 - Math.random();
    });
    return arr.slice(0, 1);
  });

  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });
  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('Do MMMM, YYYY');
  });

  eleventyConfig.addFilter('readtime', require('./lib/filters/readtime'));

  eleventyConfig.addCollection('post', collection =>
    collection
    .getFilteredByGlob('./src/blog/*.md')
    .filter(p => (!p.data.draft && p.date <= now))
  );

  eleventyConfig.addCollection('snippet', collection =>
    collection
    .getFilteredByGlob('./src/snippets/*.md')
  );

  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function (item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
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