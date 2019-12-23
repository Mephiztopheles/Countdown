describe( "Countdown", function () {

    const SECOND = 1_000,
          MINUTE = SECOND * 60,
          HOUR   = MINUTE * 60,
          DAY    = HOUR * 24,
          WEEK   = DAY * 7;

    it( "Shows a minute", function () {
        const when = new Date();
        when.setTime( when.getTime() + MINUTE );

        const converter = new Countdown( when );
        converter.parse();

        expect( converter.convert() ).toEqual( "0h 1m 0s" );
    } );

    it( "Shows an hour", function () {

        const when = new Date();
        when.setTime( when.getTime() + HOUR );

        const converter = new Countdown( when );
        converter.parse();

        expect( converter.convert() ).toEqual( "1h 0m 0s" );
    } );

    it( "Shows a day", function () {

        const when = new Date();
        when.setTime( when.getTime() + DAY );

        const converter = new Countdown( when );
        converter.parse();

        expect( converter.convert() ).toEqual( "1d 0h 0m 0s" );
    } );

    it( "Shows a week", function () {

        const when = new Date();
        when.setTime( when.getTime() + WEEK );

        const converter = new Countdown( when );
        converter.setType( Countdown.WEEKS );
        converter.parse();

        expect( converter.convert() ).toEqual( "1w 0d 0h 0m 0s" );
    } );

    it( "Shows a date", function () {

        const when = new Date();
        when.setTime( when.getTime() + WEEK );
        when.setTime( when.getTime() + DAY * 2 );
        when.setTime( when.getTime() + HOUR * 7 );
        when.setTime( when.getTime() + MINUTE * 32 );
        when.setTime( when.getTime() + SECOND * 59 );

        const converter = new Countdown( when );
        converter.setType( Countdown.WEEKS );
        converter.parse();

        expect( converter.convert() ).toEqual( "1w 2d 7h 32m 59s" );
        expect( converter.weeks ).toBe( 1 );
        expect( converter.days ).toBe( 2 );
        expect( converter.hours ).toBe( 7 );
        expect( converter.minutes ).toBe( 32 );
        expect( converter.seconds ).toBe( 59 );
    } );

    it( "Shows a date in days", function () {

        const when = new Date();
        when.setTime( when.getTime() + DAY * 256 );
        when.setTime( when.getTime() + HOUR * 7 );
        when.setTime( when.getTime() + MINUTE * 32 );
        when.setTime( when.getTime() + SECOND * 59 );

        const converter = new Countdown( when );
        converter.setType( Countdown.DAYS );
        converter.parse();

        expect( converter.convert() ).toEqual( "256d 7h 32m 59s" );
    } );

    it( "Shows a date in hours", function () {

        const when = new Date();
        when.setTime( when.getTime() + HOUR * 256 );
        when.setTime( when.getTime() + MINUTE * 32 );
        when.setTime( when.getTime() + SECOND * 59 );

        const converter = new Countdown( when );
        converter.setType( Countdown.HOURS );
        converter.parse();

        expect( converter.convert() ).toEqual( "256h 32m 59s" );
    } );

    it( "Shows a date in minutes", function () {

        const when = new Date();
        when.setTime( when.getTime() + MINUTE * 256 );
        when.setTime( when.getTime() + SECOND * 59 );

        const converter = new Countdown( when );
        converter.setType( Countdown.MINUTES );
        converter.parse();

        expect( converter.convert() ).toEqual( "256m 59s" );
    } );

    it( "Can have a five days week", function () {

        const when = new Date();
        when.setTime( when.getTime() + DAY * 10 );

        const converter = new Countdown( when, {
            daysAWeek: 5,
            omitZero : true
        } );
        converter.setType( Countdown.WEEKS );
        converter.parse();

        expect( converter.convert() ).toEqual( "2w" );
    } )
} );
