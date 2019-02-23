import { formatDate, parseDate, getWeekNumber, getDateOfISOWeek, deconstructDate } from './utils';

export var RANGE_SEPARATOR = ' - ';
export var DEFAULT_FORMATS = {
  date: 'yyyy-MM-dd',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  week: 'yyyywWW',
  time: 'HH:mm:ss',
  timerange: 'HH:mm:ss',
  timeselect: 'HH:mm',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
};
export var HAVE_TRIGGER_TYPES = ['date', 'datetime', 'time', 'timeselect', 'week', 'month', 'year', 'daterange', 'timerange', 'datetimerange'];

export var DATE_FORMATTER = function DATE_FORMATTER(value, format) {
  return formatDate(value, format);
};
export var DATE_PARSER = function DATE_PARSER(text, format) {
  return parseDate(text, format);
};
export var RANGE_FORMATTER = function RANGE_FORMATTER(value, format) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RANGE_SEPARATOR;

  if (Array.isArray(value) && value.length === 2) {
    var start = value[0];
    var end = value[1];

    if (start && end) {
      return formatDate(start, format) + separator + formatDate(end, format);
    }
  }
  return '';
};
export var RANGE_PARSER = function RANGE_PARSER(text, format) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RANGE_SEPARATOR;

  var array = text.split(separator);
  if (array.length === 2) {
    var range1 = array[0];
    var range2 = array[1];
    return [parseDate(range1, format), parseDate(range2, format)];
  }
  return [];
};

export var TYPE_VALUE_RESOLVER_MAP = {
  default: {
    formatter: function formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser: function parser(text) {
      if (text === undefined || text === '') return null;
      return text;
    }
  },
  week: {
    formatter: function formatter(value, format) {
      if (value instanceof Date) {
        if (!format) {
          var weekNumber = getWeekNumber(value);
          return value.getFullYear() + 'w' + (weekNumber > 9 ? weekNumber : '0' + weekNumber);
        } else {
          var str = DATE_FORMATTER(value, format);
          if (str != '') {
            var weekno = deconstructDate(value).week;
            str = /WW/.test(str) ? str.replace(/WW/, weekno < 10 ? '0' + weekno : weekno) : str.replace(/W/, weekno);
          }
          return str;
        }
      }

      return '';
    },
    parser: function parser(text, format) {
      var weekno = function weekno(matcher, src) {
        var str = src.substr(matcher.index, matcher.length);
        if (/\d\d?/.test(str)) {
          return { week: Number(str), isValid: true };
        } else {
          return { week: -1, isValid: false };
        }
      };

      var date = DATE_PARSER(text, format);
      var matcher = format.match(/(WW?)/);
      var wn = null;

      if (!matcher) return date;else {
        if (text.length > format.length) return '';

        switch (matcher.length) {
          case 1:
            wn = weekno(matcher, text);
            if (!wn.isValid) return '';
            break;
          case 2:
            wn = weekno(matcher, text);
            if (!wn.isValid) return '';
            break;
          default:
            throw new Error('never reach here');
        }
        return getDateOfISOWeek(wn.week, date.getFullYear());
      }
    }
  },
  date: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  datetime: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  daterange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  datetimerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  timerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  time: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  timeselect: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  month: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  year: {
    formatter: DATE_FORMATTER,
    parser: DATE_FORMATTER
  },
  number: {
    formatter: function formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser: function parser(text) {
      var result = Number(text);

      if (!isNaN(text)) {
        return result;
      } else {
        return null;
      }
    }
  }
};

export var PLACEMENT_MAP = {
  left: 'bottom-start',
  // in git version 8de9d2ce, this been changed to 
  // center: 'bottom',
  // due to it's close relation to popper, I dont have enought confidence to update it right now
  center: 'bottom-center',
  right: 'bottom-end'
};