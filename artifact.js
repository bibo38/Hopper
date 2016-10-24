'use strict';

module.exports = class
{
  constructor(group, name, version)
  {
    this.group = group
    this.name = name
    this.version = version
  }
  
  get mavenName()
  {
    return `${this.group}:${this.name}:${this.version}`
  }
  
  get valid()
  {
    return !!this.group && !!this.name && !!this.version
  }
  
  isFileValid(filename)
  {
    let checkRegex = new RegExp(`${this.name}-${this.version}\.(jar|pom(\.(sha1|md5))?)`)
    return filename.match(checkRegex)
  }
}