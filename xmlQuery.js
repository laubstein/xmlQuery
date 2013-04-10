/* ================================================
 * xmlQuery.js v1.0.0beta
 * https://github.com/laubstein/xmlQuery
 * ================================================
 * Copyright 2013 Thiago Laubstein
 *
 * Released under the MIT license
 * http://www.opensource.org/licenses/MIT
 *
 * Based on jQuery - (http://jquery.com)
 */

/*global define, window, document, DOMParser, ActiveXObject, XMLSerializer */

(function (window) {
    var
        xmlQuery = function (element, context) {
            return new xmlQuery.fn.init(element, context);
        };

    xmlQuery.fn = xmlQuery.prototype = {
        constructor: xmlQuery,
        sort: [].sort,
        splice: [].splice,
        push: [].push,
        length: 0,
        size: function () {
            return this.length;
        },
        // Based on 'extend' method from jQuery (http://jquery.com).
        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function (elems) {
            // Build a new jQuery matched element set
            var ret = xmlQuery.merge(this.constructor(), elems);

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;
            ret.context = this.context;

            // Return the newly-formed element set
            return ret;
        },
        init: function (element, context) {
            var e, i, len, parent, child, el = [];

            if (element !== null && element !== undefined) {
                if (context) {
                    parent = xmlQuery(context);
                    element = parent.find(element);
                    for (i = 0, len = element.length; i < len; i++) {
                        el.push(element[i]);
                    }
                }

                if (element.length !== undefined && typeof element === 'string') {
                    return this.append(element);
                }

                if (element.type === 'xmlQuery') {
                    return element;
                }

                if (element.length !== undefined && !element.type) {
                    if (element.length > 0) {
                        el = el.concat(element);
                    }
                } else {
                    el.push((element.documentElement || element));
                }
            } else {
                return this;
            }

            return this.append(el);
        }
    };

    xmlQuery.fn.init.prototype = xmlQuery.fn;
    // Based on 'extend' method from jQuery (http://jquery.com).
    xmlQuery.extend = xmlQuery.fn.extend = function (plainObject) {
        var src, copyIsArray, copy, name, options, clone,
            target = this;

        // Only deal with non-null/undefined values
        if ((options = plainObject) !== null) {
            // Extend the base object
            for (name in options) {
                if (options.hasOwnProperty(name)) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (copy && typeof copy === 'object') {
                        clone = src;

                        // Never move original objects, clone them
                        target[name] = xmlQuery.extend(copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    xmlQuery.extend({
        error: function (msg) {
            throw new Error(msg);
        },
        serializeXML: function (xmlObject) {
            var xml;
            try {
                if (!window.XMLSerializer) {
                    window.XMLSerializer = function () {};
                    window.XMLSerializer.prototype.serializeToString = function (xmlObject) {
                        return xmlObject.xml || '';
                    };
                }
                xml = (new XMLSerializer()).serializeToString(xmlObject);
            } catch (e) {
                xml = undefined;
            }

            if (!xml) {
                xmlQuery.error('Invalid XML Object');
            }

            return xml;
        },
        parseXML: function (data) {
            var xml, tmp;
            if (!data || typeof data !== 'string') {
                return null;
            }

            try {
                if (window.DOMParser) { // Standard
                    tmp = new DOMParser();
                    xml = tmp.parseFromString(data, 'text/xml');
                } else { // IE
                    xml = new ActiveXObject('Microsoft.XMLDOM');
                    xml.async = 'false';
                    xml.loadXML(data);
                }
            } catch (e) {
                xml = undefined;
            }

            if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
                xmlQuery.error('Invalid XML: ' + data);
            }
            return xml;
        },
        // Based on 'extend' method from jQuery (http://jquery.com).
        merge: function (first, second) {
            var l = second.length,
                i = first.length,
                j;

            if (typeof l === 'number') {
                for (j = 0; j < l; j++) {
                    first[i++] = second[j];
                }
            } else {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }

            first.length = i;

            return first;
        }
    });

    xmlQuery.fn.extend({
        type: 'xmlQuery',
        attr: function (name, value) {
            var i;

            if (value === undefined) {
                return this[0].getAttribute(name) || undefined;
            }

            for (i = 0; i < this.length; i++) {
                if (value !== null && value !== undefined) {
                    this[i].setAttribute(name, value);
                }
            }

            return this;
        },
        find: function (element) {
            var i, j, found,
                ret = [];
            for (i = 0; i < this.length; i++) {
                found = this[i].getElementsByTagName(element);
                for (j = 0; j < found.length; j++) {
                    ret.push(found[j]);
                }
            }
            return this.pushStack(ret);
        },
        append: function (value) {
            var i, e, len, cloned = [];

            // string
            if (value.length && typeof value === 'string') {
                value = xmlQuery.parseXML('<root>' + value + '</root>').documentElement.childNodes;
                for (i = 0, len = value.length; i < len; i++) {
                    cloned.push((value[i].documentElement || value[i]).cloneNode(true));
                }
                value = cloned;
            }

            if (typeof value.length === 'number' && this.length === 1) {
                // array
                for (i = 0, len = value.length; i < len; i++) {
                    this.append(value[i]);
                }
                return this;
            }

            // object
            if (this.length === 0) {
                if (value.length === undefined && typeof value === 'object') {
                    value = [value];
                }

                for (i = 0, len = value.length; i < len; i++) {
                    this.push(value[i]);
                }
            } else {
                for (i = 0, len = this.length; i < len; i++) {
                    if (this[i].importNode) {
                        e = this[i].importNode(value);
                    } else {
                        this[i].appendChild((value.documentElement || value).cloneNode(true));
                    }
                }
            }

            return this;
        },
        serialize: function () {
            var ret;

            if (this.length > 1) {
                ret = xmlQuery('<root></root>').append(this)[0];
            } else {
                ret = this[0];
            }

            return xmlQuery.serializeXML(ret).replace(/ ?xmlns="[^\"]*" ?/g, ' ');
        },
        toString: function () {
            return this.serialize();
        },
        first: function () {
            return this.length > 0 ? xmlQuery(this[0]) : this;
        },
        last: function () {
            return this.length > 0 ? xmlQuery(this[this.length - 1]) : this;
        },
        eq: function (idx) {
            return xmlQuery(this[idx]);
        },
        size: function () {
            return this.length;
        },
        clone: function (deep) {
            var i, len, cloned = this.constructor();

            deep = deep === undefined ? true : deep;

            for (i = 0, len = this.length; i < len; i++) {
                cloned.append(this[i].cloneNode(deep));
            }
            return cloned;
        }
    });

    window.xmlQuery = window.$X = xmlQuery;
}(window));