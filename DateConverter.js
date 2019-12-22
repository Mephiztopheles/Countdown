class DateConverter {

    constructor( until, config = {}, type = DateConverter.DAYS, defaultText = "" ) {

        this.parsed = [];
        this.config = {
            weekText                 : "w",
            dayText                  : "d",
            hourText                 : "h",
            minuteText               : "m",
            secondText               : "s",
            hoursADay                : 24,
            daysAWeek                : 7,
            spaceBetweenNumberAndText: false,
            omitZero                 : false
        };

        this.until       = until;
        this.defaultText = defaultText;
        this.setType( type );

        Object.assign( this.config, config );
    }

    setType( type ) {
        this.type = type;
    }

    parse() {

        this.calcMilliseconds();

        if ( this.milliseconds === -1 )
            return this.defaultText;

        if ( this.milliseconds === 0 )
            return 0;

        this.parsed.length = 0;

        this.processSeconds();
        this.processMinutes();
        this.processHours();
        this.processDays();
        this.processWeeks();

        this.parsed.sort( () => -1 );
    }

    convert() {
        return ( this.isNegative() ? "-" : "" ) + this.parsed.join( " " );
    }

    getParts() {
        return this.parsed;
    }

    isNegative() {
        return this.milliseconds < 0;
    }

    calcMilliseconds() {

        const now = new Date();
        now.setMilliseconds( 0 );
        this.milliseconds = this.until.getTime() - now.getTime();
    }

    processSeconds() {

        let seconds = Math.floor( Math.abs( this.milliseconds ) / 1000 );

        if ( this.type > DateConverter.SECONDS )
            seconds = seconds % 60;

        if ( seconds !== 0 || !this.config.omitZero && this.type > DateConverter.SECONDS ) {

            this.seconds = seconds;
            this.parsed.push( this.getText( this.config.secondText, seconds ) );
        }
    }

    processMinutes() {

        if ( this.type < DateConverter.MINUTES )
            return;

        let minutes = Math.floor( Math.abs( this.milliseconds ) / 60000 );

        if ( this.type > DateConverter.MINUTES )
            minutes = minutes % 60;

        if ( minutes !== 0 || !this.config.omitZero && this.type > DateConverter.MINUTES ) {

            this.minutes = minutes;
            this.parsed.push( this.getText( this.config.minuteText, minutes ) );
        }
    }

    processHours() {

        if ( this.type < DateConverter.HOURS )
            return;

        let hours = Math.floor( Math.abs( this.milliseconds ) / 3600000 );

        if ( this.type > DateConverter.HOURS )
            hours = hours % 24 % this.config.hoursADay;

        if ( hours !== 0 || !this.config.omitZero && this.type > DateConverter.HOURS ) {

            this.hours = hours;
            this.parsed.push( this.getText( this.config.hourText, hours ) );
        }
    }

    processDays() {

        if ( this.type < DateConverter.DAYS )
            return;

        let days = Math.floor( Math.abs( this.milliseconds ) / this.getMillisecondsDays() );

        if ( this.type > DateConverter.DAYS )
            days = days % this.config.daysAWeek;

        if ( days !== 0 || !this.config.omitZero && this.type > DateConverter.DAYS ) {

            this.days = days;
            this.parsed.push( this.getText( this.config.dayText, days ) );
        }
    }

    processWeeks() {

        if ( this.type < DateConverter.WEEKS )
            return;

        let weeks = Math.floor( Math.abs( this.milliseconds ) / this.getMillisecondsWeeks() );

        if ( weeks !== 0 || !this.config.omitZero && this.type > DateConverter.WEEKS ) {

            this.weeks = weeks;
            this.parsed.push( this.getText( this.config.weekText, weeks ) );
        }
    }

    getMillisecondsDays() {
        return 3600000 * this.config.hoursADay;
    }

    getMillisecondsWeeks() {
        return this.getMillisecondsDays() * this.config.daysAWeek
    }

    getText( text, value ) {

        if ( typeof text != "string" )
            text = value === 1 ? text[ "singular" ] : text[ "plural" ];

        return value + ( this.config.spaceBetweenNumberAndText ? " " : "" ) + text;
    }
}

DateConverter.SECONDS = 0;
DateConverter.MINUTES = 1;
DateConverter.HOURS   = 2;
DateConverter.DAYS    = 3;
DateConverter.WEEKS   = 4;

Object.freeze( DateConverter );