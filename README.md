xmlQuery
===================

Javascript XML manipulation inspired on [jQuery](http://jquery.com/).

### Why?

When trying to manipulate XML data using jQuery, I realized that all the elements and attributes are turned into lower-case and, in some cases, the code do not work well on IE.

### Supported methods

<table>
    <tbody>
        <tr>
            <td><b>append (value)</b></td><td>Append an element</td>
        </tr>
        <tr>
            <td><b>attr (name, [value])</b></td><td>Get os set an attribute</td>
        </tr>
        <tr>
            <td><b>clone ([deep])</b></td><td>Clone the set of elements</td>
        </tr>
        <tr>
            <td><b>eq (idx)</b></td><td>Returns the element at nth position</td>
        </tr>
        <tr>
            <td><b>find (elementName)</b></td><td>Returns the elements with the specified name</td>
        </tr>
        <tr>
            <td><b>first ()</b></td><td>Returns the first element in the set</td>
        </tr>
        <tr>
            <td><b>last ()</b></td><td>Returns the last element in the set</td>
        </tr>
        <tr>
            <td><b>serialize ()</b></td><td>Returns the serialized xml</td>
        </tr>
        <tr>
            <td><b>size ()</b></td><td>Returns the number of elements in the set</td>
        </tr>
    </tbody>
</table>

### Example

```javascript

var myXMLData = '<root><myData dataType="Boolean">True</myData></root>',
    myXMLQuery = $X(myXMLData);
console.log('Serialized XML: ' + myXMLQuery.serialize());
// returns: Serialized XML: <root><myData dataType="Boolean">True</myData></root>
console.log('Attribute: ' + myXMLQuery.find('myData').attr('dataType'));
// returns: Attribute: Boolean

```

[Check the test results](http://laubstein.github.io/xmlQuery/test/all.html)

--------------------------------------

Created by [Thiago Laubstein](http://github.com/laubstein).
