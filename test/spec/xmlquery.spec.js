describe('xmlQuery', function() {
    var xmlData;

    beforeEach(function() {
        xmlData = '<root><myData dataType="Boolean">True</myData></root>';
    });

    it('Empty xmlQuery object', function() {
        var object = $X();
        expect(object).toBeDefined();
        expect(object.type).toBe('xmlQuery');
    });


    it('Convert string data to xmlQuery object', function() {
        var object = $X(xmlData);
        expect(object).toBeDefined();
        expect(object.type).toBe('xmlQuery');
    });

    it('Convert xmlObject to xmlQuery object', function() {
        var object = $X(xmlQuery.parseXML('<root />'));
        expect(object.serialize()).toBe('<root/>');
    });

    it('Serialize xmlQuery object', function() {
        var object = $X(xmlData).serialize();
        expect(object).toBe(xmlData);
    });

    describe('Check methods', function() {
        var object;

        beforeEach(function() {
            object = $X(xmlData);
        });

        it('Find elements [.find(elementName)]', function() {
            var data = object.find('myData');
            expect(data.size()).toBe(1);
        });

        it('Get attributes [.attr(attrName)]', function() {
            var attr = object.find('myData').attr('dataType');
            expect(attr).toBe('Boolean');
        });

        it('Set attributes [.attr(\'Test\', \'tested\')]', function() {
            var data = object.find('myData').attr('Test', 'tested');
            expect(data.attr('Test')).toBe('tested');
        });

        it('Append elements - string mode [.append(\'<a />\')]', function() {
            var data = $X('<root />').append('<a />');
            expect(data.serialize()).toBe('<root><a/></root>');
            data.find('a').append('<b>test</b>');
            expect(data.serialize()).toBe('<root><a><b>test</b></a></root>');
        });

        it('Append elements - xmlQuery mode [.append(xmlQueryObject)]', function() {
            var data = $X('<root />'),
                data2 = $X('<element>Content</element>');
            data.append(data2);
            expect(data.serialize()).toBe('<root><element>Content</element></root>');
        });

        it('Append elements - xmlObject mode [.append(xmlObject)]', function() {
            var data = $X('<root />'),
                data2 = $X.parseXML('<element>Content</element>').documentElement;
            data.append(data2);
            expect(data.serialize()).toBe('<root><element>Content</element></root>');
        });

        it('Append multiple elements - string mode [.append(\'<a /><b />\')]', function() {
            var data = $X('<root />').append('<a /><b />');
            expect(data.serialize()).toBe('<root><a/><b/></root>');
            data.find('a').append('<b>test</b>');
            expect(data.serialize()).toBe('<root><a><b>test</b></a><b/></root>');
        });

        it('Append multiple elements - xmlQuery mode [.append([xmlQueryObject, xmlQueryObject])]', function() {
            var data = $X('<root />'),
                data2 = $X('<element>Content</element>'),
                data3 = $X('<element2>Content</element2>');
            data.append([data2, data3]);
            expect(data.serialize()).toBe('<root><element>Content</element><element2>Content</element2></root>');
        });

        it('Append multiple elements - xmlQuery mixed mode [.append(xmlQueryObject(\'<element>Content</element><element2>Content</element2>\'))]', function() {
            var data = $X('<root />'),
                data2 = $X('<element>Content</element><element2>Content</element2>');
            data.append(data2);
            expect(data.serialize()).toBe('<root><element>Content</element><element2>Content</element2></root>');
        });

        it('Append multiple elements - xmlQuery mixed mode [.append([xmlQueryObject(\'<element>Content</element><element2>Content</element2>\'), xmlObject])]', function() {
            var data = $X('<root />'),
                data2 = $X('<element>Content</element><element2>Content</element2>'),
                data3 = $X.parseXML('<element3 />');
            data.append([data2, data3]);
            expect(data.serialize()).toBe('<root><element>Content</element><element2>Content</element2><element3/></root>');
        });

        it('Append multiple elements - xmlQuery mixed mode [.append(xmlQueryObject(\'<element>Content</element><element2>Content</element2>\').append(xmlObject))]', function() {
            var data = $X('<root />'),
                data2 = $X('<element>Content</element><element2>Content</element2>'),
                data3 = $X.parseXML('<element3 />');
            data.append(data2.append(data3));
            expect(data.serialize()).toBe('<root><element>Content<element3/></element><element2>Content<element3/></element2></root>');
        });

        it('First element (.first)', function() {
            expect($X('<root><element>first</element><element>second</element></root>').find('element').first().serialize()).toBe('<element>first</element>');
        });

        it('Last element (.last)', function() {
            expect($X('<root><element>first</element><element>second</element></root>').find('element').last().serialize()).toBe('<element>second</element>');
        });

        it('Positional element (.eq)', function() {
            var data = $X('<root><element>first</element><element>second</element></root>').find('element');
            expect(data.eq(0).serialize()).toBe('<element>first</element>');
            expect(data.eq(1).serialize()).toBe('<element>second</element>');
        });

        it('Size (.size)', function() {
            var data = $X('<root><element>first</element><element>second</element></root>').find('element');
            expect(data.size()).toBe(2);
        });

        it('Clone (.clone)', function() {
            var data = $X(xmlData).append('<test />'),
                cloned = data.clone(true);
            cloned = data.clone(true);
            data.append('<test2 />');
            expect(data).not.toBe(cloned);
            expect(data.serialize()).not.toBe(cloned.serialize());
            cloned.append('<test2 />');
            expect(data.serialize()).toBe(cloned.serialize());
            expect(data.serialize()).toEqual(cloned.serialize());
        });
    });
});
