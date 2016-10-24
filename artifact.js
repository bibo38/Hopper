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
}