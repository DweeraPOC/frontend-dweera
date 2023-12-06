import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import moment from "moment/moment";
import perDayValidator from "../../Components/DataValidation/checkOutValidators";
import LocationMap from "../../Components/LocationMap/LocationMap";
import { useAuth } from "../../Middlewares/AuthContext";
import ErrorDisplayer from "../../Components/ErrorDisplayer/ErrorDisplayer";
import MyDatepicker from "../../Components/DatePicker/MyDatepicker";
import Summary from "../../Components/Summary/Summary";
import { useCallback } from "react";
import SelectLocation from "./Child/SelectLocation";
import { Helmet } from "react-helmet";
import { SHA512, pack } from "./Child/Functions";
import { v4 as uuidv4 } from 'uuid';

function NewCheckOut() {
  const systemDate = new Date();
  const [selectedValue, setSelectedValue] = useState("online");
  const [totalPrice, setTotalPrice] = useState(0);
  const [_loading, set_Loading] = useState(false);
  const AmountRef = useRef(null);

  const [phoneIsExist, setPhoneIsExist] = useState(false);
  const { t } = useTranslation();
  const { id } = useParams();
  const auth = useAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [offerData, setOfferData] = useState({});
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [bookingsDates, setBookingsDates] = useState({
    startDate: new Date(systemDate.setDate(systemDate.getDate() - 0)),
    endDate: new Date(systemDate.setDate(systemDate.getDate() - 0)),
  });
  const [bookings, setBookings] = useState([]);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [bookingHours, setBookingHours] = useState([]);
  const [hours, setHours] = useState([]);
  const [err, setErr] = useState(false);
  const [locations, setlocations] = useState([]);
  const [location, setLocation] = useState(null);
  const [errDate, setErrDate] = useState(null);
  const [errLocation, setErrorLocation] = useState();
  const [summaryInfo, setSummaryInfo] = useState({
    initialPrice: null,
    priceType: null,
  });

  const [rent, setRent] = useState({
    rentType: "none",
    rentTypeError: null,
  });
  const [week, setWeek] = useState(1);
  const [month, setMonth] = useState(1);
  const [token, setToken] = useState(null);
  const [oid, setOid] = useState('');

  useEffect(() => {
    // Generate a UUID
    const uniqueID = uuidv4();
    console.log(uniqueID)
    setOid(uniqueID);
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };
  const CMI = () => {
    return <React.Fragment></React.Fragment>;
  };
  const CheckBookings = (dates, bookings, type) => {
    //console.log(dates,bookings,type)
    if (type === "Per_day" || type === "Per_week" || type === "Per_month") {
      let err = {
        message: null,
        success: true,
      };
      const days =
        rent?.rentType === "Per_day"
          ? offerData?.offer?.available_day_hours["days"]
              ?.filter((day) => {
                return Object?.keys(day)?.some((key) => {
                  const { start, end } = day[key];
                  return start == "24-hours" && end == "24-hours";
                });
              })
              .map((obj) => Object.keys(obj)[0])
          : offerData?.offer?.available_day_hours["days"]?.map(
              (obj) => Object.keys(obj)[0]
            );

      const start = dates.startDate;
      const end = dates.endDate;
      const genDates = (__start, __end) => {
        let arrOfDays = [];
        let loop = __start;
        for (var day = loop; day <= __end; day.setDate(day.getDate() + 1)) {
          arrOfDays.push(day.toISOString().slice(0, 10));
          let newDate = loop.setDate(loop.getDate() + 0);
          loop = new Date(newDate);
        }
        return arrOfDays;
      };
      const arr = genDates(new Date(start), new Date(end));
      const clean = arr.filter((d) =>
        days?.includes(
          new Date(d).toLocaleDateString("en-US", { weekday: "long" })
        )
      );
      if (clean.length > 0) {
        return (err = {
          ...err,
          success: false,
          message: "You can not select disabled dates.",
        });
      }
      const dateCheck = (_start1, _end1, _start2, _end2) => {
        const start1 = new Date(_start1);
        const end1 = new Date(_end1);
        const start2 = new Date(_start2);
        const end2 = new Date(_end2);

        // Check if either range is completely before or after the other
        if (end1 < start2 || end2 < start1) {
          return false;
        }

        // Otherwise, the ranges overlap
        return true;
      };

      const Add_Days = (d, n) =>
        new Date(new Date(d)?.setDate(new Date(d).getDate() + n));

      if (type === "Per_week") {
        /*arr?.forEach((d) => {
          bookings?.forEach((b) => {
            //console.log(dateCheck(b?.start_date, b?.end_date, Add_Days(d,30), Add_Days(d,30)))
            if (dateCheck(b?.start_date, b?.end_date, Add_Days(d,7*week), Add_Days(d,7*week))) {
              return (err = {
                ...err,
                success: false,
                message: "You can not select disabled dates.",
              });
            }
          });
        });*/
        for (const booking of bookings) {
          const bookingStartDate = new Date(booking?.start_date);
          const bookingEndDate = new Date(booking?.end_date);
          const datePickerStartDate = new Date(start);
          const datePickerEndDate = Add_Days(start, 7 * week);

          if (
            (bookingStartDate >= datePickerStartDate &&
              bookingStartDate <= datePickerEndDate) ||
            (bookingEndDate >= datePickerStartDate &&
              bookingEndDate <= datePickerEndDate) ||
            (bookingStartDate <= datePickerStartDate &&
              bookingEndDate >= datePickerEndDate)
          )
            return (err = {
              ...err,
              success: false,
              message: "You can not select disabled dates.",
            });
        }
      }

      if (type === "Per_month") {
        /*arr?.forEach((d) => {
          bookings?.forEach((b) => {
            //console.log(dateCheck(b?.start_date, b?.end_date, Add_Days(d,30), Add_Days(d,30)))
            if (dateCheck(b?.start_date, b?.end_date, Add_Days(d,30), Add_Days(d,30))) {
              return (err = {
                ...err,
                success: false,
                message: "You can not select disabled dates.",
              });
            }
          });
        });*/
        for (const booking of bookings) {
          const bookingStartDate = new Date(booking?.start_date);
          const bookingEndDate = new Date(booking?.end_date);
          const datePickerStartDate = new Date(start);
          const datePickerEndDate = Add_Days(start, 30 * month);

          if (
            (bookingStartDate >= datePickerStartDate &&
              bookingStartDate <= datePickerEndDate) ||
            (bookingEndDate >= datePickerStartDate &&
              bookingEndDate <= datePickerEndDate) ||
            (bookingStartDate <= datePickerStartDate &&
              bookingEndDate >= datePickerEndDate)
          )
            return (err = {
              ...err,
              success: false,
              message: "You can not select disabled dates.",
            });
        }
      }
      if (type === "Per_day") {
        /*arr?.forEach((d) => {
          bookings?.forEach((b) => {
            console.log(dateCheck(b?.start_date, b?.end_date, d, d))
            if (dateCheck(b?.start_date, b?.end_date, d, d)) {
              return (err = {
                ...err,
                success: false,
                message: "You can not select disabled dates.",
              });
            }
          });
        });*/
        for (const booking of bookings) {
          const bookingStartDate = new Date(booking?.start_date);
          const bookingEndDate = new Date(booking?.end_date);
          const datePickerStartDate = new Date(start);
          const datePickerEndDate = new Date(end);

          if (
            (bookingStartDate >= datePickerStartDate &&
              bookingStartDate <= datePickerEndDate) ||
            (bookingEndDate >= datePickerStartDate &&
              bookingEndDate <= datePickerEndDate) ||
            (bookingStartDate <= datePickerStartDate &&
              bookingEndDate >= datePickerEndDate)
          )
            return (err = {
              ...err,
              success: false,
              message: "You can not select disabled dates.",
            });
        }
      }

      return err;
    } else
      return {
        message: null,
        success: true,
      };
  };
  const paymentRef = useRef(null);
  function cleanSpecialCharacters(str) {
    const normalizedString = str?.normalize("NFD");
    var cleanedString = normalizedString?.replace(/[\u0300-\u036f]/g, "");
    cleanedString = cleanedString?.replace(/[^\w\s&?@:\/.=]/gi, '');
    cleanedString = cleanedString?.trim()
    return cleanedString;
  }
  const HandlePayment = () => {
    const SHA512 = (str) => {
      function int64(msint_32, lsint_32) {
        this.highOrder = msint_32;
        this.lowOrder = lsint_32;
      }

      var H = [
        new int64(0x6a09e667, 0xf3bcc908),
        new int64(0xbb67ae85, 0x84caa73b),
        new int64(0x3c6ef372, 0xfe94f82b),
        new int64(0xa54ff53a, 0x5f1d36f1),
        new int64(0x510e527f, 0xade682d1),
        new int64(0x9b05688c, 0x2b3e6c1f),
        new int64(0x1f83d9ab, 0xfb41bd6b),
        new int64(0x5be0cd19, 0x137e2179),
      ];

      var K = [
        new int64(0x428a2f98, 0xd728ae22),
        new int64(0x71374491, 0x23ef65cd),
        new int64(0xb5c0fbcf, 0xec4d3b2f),
        new int64(0xe9b5dba5, 0x8189dbbc),
        new int64(0x3956c25b, 0xf348b538),
        new int64(0x59f111f1, 0xb605d019),
        new int64(0x923f82a4, 0xaf194f9b),
        new int64(0xab1c5ed5, 0xda6d8118),
        new int64(0xd807aa98, 0xa3030242),
        new int64(0x12835b01, 0x45706fbe),
        new int64(0x243185be, 0x4ee4b28c),
        new int64(0x550c7dc3, 0xd5ffb4e2),
        new int64(0x72be5d74, 0xf27b896f),
        new int64(0x80deb1fe, 0x3b1696b1),
        new int64(0x9bdc06a7, 0x25c71235),
        new int64(0xc19bf174, 0xcf692694),
        new int64(0xe49b69c1, 0x9ef14ad2),
        new int64(0xefbe4786, 0x384f25e3),
        new int64(0x0fc19dc6, 0x8b8cd5b5),
        new int64(0x240ca1cc, 0x77ac9c65),
        new int64(0x2de92c6f, 0x592b0275),
        new int64(0x4a7484aa, 0x6ea6e483),
        new int64(0x5cb0a9dc, 0xbd41fbd4),
        new int64(0x76f988da, 0x831153b5),
        new int64(0x983e5152, 0xee66dfab),
        new int64(0xa831c66d, 0x2db43210),
        new int64(0xb00327c8, 0x98fb213f),
        new int64(0xbf597fc7, 0xbeef0ee4),
        new int64(0xc6e00bf3, 0x3da88fc2),
        new int64(0xd5a79147, 0x930aa725),
        new int64(0x06ca6351, 0xe003826f),
        new int64(0x14292967, 0x0a0e6e70),
        new int64(0x27b70a85, 0x46d22ffc),
        new int64(0x2e1b2138, 0x5c26c926),
        new int64(0x4d2c6dfc, 0x5ac42aed),
        new int64(0x53380d13, 0x9d95b3df),
        new int64(0x650a7354, 0x8baf63de),
        new int64(0x766a0abb, 0x3c77b2a8),
        new int64(0x81c2c92e, 0x47edaee6),
        new int64(0x92722c85, 0x1482353b),
        new int64(0xa2bfe8a1, 0x4cf10364),
        new int64(0xa81a664b, 0xbc423001),
        new int64(0xc24b8b70, 0xd0f89791),
        new int64(0xc76c51a3, 0x0654be30),
        new int64(0xd192e819, 0xd6ef5218),
        new int64(0xd6990624, 0x5565a910),
        new int64(0xf40e3585, 0x5771202a),
        new int64(0x106aa070, 0x32bbd1b8),
        new int64(0x19a4c116, 0xb8d2d0c8),
        new int64(0x1e376c08, 0x5141ab53),
        new int64(0x2748774c, 0xdf8eeb99),
        new int64(0x34b0bcb5, 0xe19b48a8),
        new int64(0x391c0cb3, 0xc5c95a63),
        new int64(0x4ed8aa4a, 0xe3418acb),
        new int64(0x5b9cca4f, 0x7763e373),
        new int64(0x682e6ff3, 0xd6b2b8a3),
        new int64(0x748f82ee, 0x5defb2fc),
        new int64(0x78a5636f, 0x43172f60),
        new int64(0x84c87814, 0xa1f0ab72),
        new int64(0x8cc70208, 0x1a6439ec),
        new int64(0x90befffa, 0x23631e28),
        new int64(0xa4506ceb, 0xde82bde9),
        new int64(0xbef9a3f7, 0xb2c67915),
        new int64(0xc67178f2, 0xe372532b),
        new int64(0xca273ece, 0xea26619c),
        new int64(0xd186b8c7, 0x21c0c207),
        new int64(0xeada7dd6, 0xcde0eb1e),
        new int64(0xf57d4f7f, 0xee6ed178),
        new int64(0x06f067aa, 0x72176fba),
        new int64(0x0a637dc5, 0xa2c898a6),
        new int64(0x113f9804, 0xbef90dae),
        new int64(0x1b710b35, 0x131c471b),
        new int64(0x28db77f5, 0x23047d84),
        new int64(0x32caab7b, 0x40c72493),
        new int64(0x3c9ebe0a, 0x15c9bebc),
        new int64(0x431d67c4, 0x9c100d4c),
        new int64(0x4cc5d4be, 0xcb3e42b6),
        new int64(0x597f299c, 0xfc657e2a),
        new int64(0x5fcb6fab, 0x3ad6faec),
        new int64(0x6c44198c, 0x4a475817),
      ];

      var W = new Array(64);
      var a, b, c, d, e, f, g, h, i, j;
      var T1, T2;
      var charsize = 8;

      function utf8_encode(str) {
        return unescape(encodeURIComponent(str));
      }

      function str2binb(str) {
        var bin = [];
        var mask = (1 << charsize) - 1;
        var len = str.length * charsize;

        for (var i = 0; i < len; i += charsize) {
          bin[i >> 5] |=
            (str.charCodeAt(i / charsize) & mask) << (32 - charsize - (i % 32));
        }

        return bin;
      }

      function binb2hex(binarray) {
        var hex_tab = "0123456789abcdef";
        var str = "";
        var length = binarray.length * 4;
        var srcByte;

        for (var i = 0; i < length; i += 1) {
          srcByte = binarray[i >> 2] >> ((3 - (i % 4)) * 8);
          str +=
            hex_tab.charAt((srcByte >> 4) & 0xf) +
            hex_tab.charAt(srcByte & 0xf);
        }

        return str;
      }

      function safe_add_2(x, y) {
        var lsw, msw, lowOrder, highOrder;

        lsw = (x.lowOrder & 0xffff) + (y.lowOrder & 0xffff);
        msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
        lowOrder = ((msw & 0xffff) << 16) | (lsw & 0xffff);

        lsw = (x.highOrder & 0xffff) + (y.highOrder & 0xffff) + (msw >>> 16);
        msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
        highOrder = ((msw & 0xffff) << 16) | (lsw & 0xffff);

        return new int64(highOrder, lowOrder);
      }

      function safe_add_4(a, b, c, d) {
        var lsw, msw, lowOrder, highOrder;

        lsw =
          (a.lowOrder & 0xffff) +
          (b.lowOrder & 0xffff) +
          (c.lowOrder & 0xffff) +
          (d.lowOrder & 0xffff);
        msw =
          (a.lowOrder >>> 16) +
          (b.lowOrder >>> 16) +
          (c.lowOrder >>> 16) +
          (d.lowOrder >>> 16) +
          (lsw >>> 16);
        lowOrder = ((msw & 0xffff) << 16) | (lsw & 0xffff);

        lsw =
          (a.highOrder & 0xffff) +
          (b.highOrder & 0xffff) +
          (c.highOrder & 0xffff) +
          (d.highOrder & 0xffff) +
          (msw >>> 16);
        msw =
          (a.highOrder >>> 16) +
          (b.highOrder >>> 16) +
          (c.highOrder >>> 16) +
          (d.highOrder >>> 16) +
          (lsw >>> 16);
        highOrder = ((msw & 0xffff) << 16) | (lsw & 0xffff);

        return new int64(highOrder, lowOrder);
      }

      function safe_add_5(a, b, c, d, e) {
        var lsw, msw, lowOrder, highOrder;

        lsw =
          (a.lowOrder & 0xffff) +
          (b.lowOrder & 0xffff) +
          (c.lowOrder & 0xffff) +
          (d.lowOrder & 0xffff) +
          (e.lowOrder & 0xffff);
        msw =
          (a.lowOrder >>> 16) +
          (b.lowOrder >>> 16) +
          (c.lowOrder >>> 16) +
          (d.lowOrder >>> 16) +
          (e.lowOrder >>> 16) +
          (lsw >>> 16);
        lowOrder = ((msw & 0xffff) << 16) | (lsw & 0xffff);

        lsw =
          (a.highOrder & 0xffff) +
          (b.highOrder & 0xffff) +
          (c.highOrder & 0xffff) +
          (d.highOrder & 0xffff) +
          (e.highOrder & 0xffff) +
          (msw >>> 16);
        msw =
          (a.highOrder >>> 16) +
          (b.highOrder >>> 16) +
          (c.highOrder >>> 16) +
          (d.highOrder >>> 16) +
          (e.highOrder >>> 16) +
          (lsw >>> 16);
        highOrder = ((msw & 0xffff) << 16) | (lsw & 0xffff);

        return new int64(highOrder, lowOrder);
      }

      function maj(x, y, z) {
        return new int64(
          (x.highOrder & y.highOrder) ^
            (x.highOrder & z.highOrder) ^
            (y.highOrder & z.highOrder),
          (x.lowOrder & y.lowOrder) ^
            (x.lowOrder & z.lowOrder) ^
            (y.lowOrder & z.lowOrder)
        );
      }

      function ch(x, y, z) {
        return new int64(
          (x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
          (x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
        );
      }

      function rotr(x, n) {
        if (n <= 32) {
          return new int64(
            (x.highOrder >>> n) | (x.lowOrder << (32 - n)),
            (x.lowOrder >>> n) | (x.highOrder << (32 - n))
          );
        } else {
          return new int64(
            (x.lowOrder >>> n) | (x.highOrder << (32 - n)),
            (x.highOrder >>> n) | (x.lowOrder << (32 - n))
          );
        }
      }

      function sigma0(x) {
        var rotr28 = rotr(x, 28);
        var rotr34 = rotr(x, 34);
        var rotr39 = rotr(x, 39);

        return new int64(
          rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder,
          rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder
        );
      }

      function sigma1(x) {
        var rotr14 = rotr(x, 14);
        var rotr18 = rotr(x, 18);
        var rotr41 = rotr(x, 41);

        return new int64(
          rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder,
          rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder
        );
      }

      function gamma0(x) {
        var rotr1 = rotr(x, 1),
          rotr8 = rotr(x, 8),
          shr7 = shr(x, 7);

        return new int64(
          rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder,
          rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder
        );
      }

      function gamma1(x) {
        var rotr19 = rotr(x, 19);
        var rotr61 = rotr(x, 61);
        var shr6 = shr(x, 6);

        return new int64(
          rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder,
          rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder
        );
      }

      function shr(x, n) {
        if (n <= 32) {
          return new int64(
            x.highOrder >>> n,
            (x.lowOrder >>> n) | (x.highOrder << (32 - n))
          );
        } else {
          return new int64(0, x.highOrder << (32 - n));
        }
      }

      str = utf8_encode(str);
      let strlen = str.length * charsize;
      str = str2binb(str);

      str[strlen >> 5] |= 0x80 << (24 - (strlen % 32));
      str[(((strlen + 128) >> 10) << 5) + 31] = strlen;

      for (var i = 0; i < str.length; i += 32) {
        a = H[0];
        b = H[1];
        c = H[2];
        d = H[3];
        e = H[4];
        f = H[5];
        g = H[6];
        h = H[7];

        for (var j = 0; j < 80; j++) {
          if (j < 16) {
            W[j] = new int64(str[j * 2 + i], str[j * 2 + i + 1]);
          } else {
            W[j] = safe_add_4(
              gamma1(W[j - 2]),
              W[j - 7],
              gamma0(W[j - 15]),
              W[j - 16]
            );
          }

          T1 = safe_add_5(h, sigma1(e), ch(e, f, g), K[j], W[j]);
          T2 = safe_add_2(sigma0(a), maj(a, b, c));
          h = g;
          g = f;
          f = e;
          e = safe_add_2(d, T1);
          d = c;
          c = b;
          b = a;
          a = safe_add_2(T1, T2);
        }

        H[0] = safe_add_2(a, H[0]);
        H[1] = safe_add_2(b, H[1]);
        H[2] = safe_add_2(c, H[2]);
        H[3] = safe_add_2(d, H[3]);
        H[4] = safe_add_2(e, H[4]);
        H[5] = safe_add_2(f, H[5]);
        H[6] = safe_add_2(g, H[6]);
        H[7] = safe_add_2(h, H[7]);
      }

      var binarray = [];
      for (var i = 0; i < H.length; i++) {
        binarray.push(H[i].highOrder);
        binarray.push(H[i].lowOrder);
      }
      return binb2hex(binarray);
    };

    ///////////////////////////////////////////////////////////////////////
    function pack(format) {
      //  discuss at: http://locutus.io/php/pack/
      // original by: Tim de Koning (http://www.kingsquare.nl)
      //    parts by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
      // bugfixed by: Tim de Koning (http://www.kingsquare.nl)
      //      note 1: Float encoding by: Jonas Raoni Soares Silva
      //      note 1: Home: http://www.kingsquare.nl/blog/12-12-2009/13507444
      //      note 1: Feedback: phpjs-pack@kingsquare.nl
      //      note 1: "machine dependent byte order and size" aren't
      //      note 1: applicable for JavaScript; pack works as on a 32bit,
      //      note 1: little endian machine.
      //   example 1: pack('nvc*', 0x1234, 0x5678, 65, 66)
      //   returns 1: '\u00124xVAB'
      //   example 2: pack('H4', '2345')
      //   returns 2: '#E'
      //   example 3: pack('H*', 'D5')
      //   returns 3: 'Õ'
      //   example 4: pack('d', -100.876)
      //   returns 4: "\u0000\u0000\u0000\u0000\u00008YÀ"
      //        test: skip-1

      var formatPointer = 0;
      var argumentPointer = 1;
      var result = "";
      var argument = "";
      var i = 0;
      var r = [];
      var instruction,
        quantifier,
        word,
        precisionBits,
        exponentBits,
        extraNullCount;

      // vars used by float encoding
      var bias;
      var minExp;
      var maxExp;
      var minUnnormExp;
      var status;
      var exp;
      var len;
      var bin;
      var signal;
      var n;
      var intPart;
      var floatPart;
      var lastBit;
      var rounded;
      var j;
      var k;
      var tmpResult;

      while (formatPointer < format.length) {
        instruction = format.charAt(formatPointer);
        quantifier = "";
        formatPointer++;
        while (
          formatPointer < format.length &&
          format.charAt(formatPointer).match(/[\d*]/) !== null
        ) {
          quantifier += format.charAt(formatPointer);
          formatPointer++;
        }
        if (quantifier === "") {
          quantifier = "1";
        }

        // Now pack variables: 'quantifier' times 'instruction'
        switch (instruction) {
          case "a":
          case "A":
            // NUL-padded string
            // SPACE-padded string
            if (typeof arguments[argumentPointer] === "undefined") {
              throw new Error(
                "Warning:  pack() Type " +
                  instruction +
                  ": not enough arguments"
              );
            } else {
              argument = String(arguments[argumentPointer]);
            }
            if (quantifier === "*") {
              quantifier = argument.length;
            }
            for (i = 0; i < quantifier; i++) {
              if (typeof argument[i] === "undefined") {
                if (instruction === "a") {
                  result += String.fromCharCode(0);
                } else {
                  result += " ";
                }
              } else {
                result += argument[i];
              }
            }
            argumentPointer++;
            break;
          case "h":
          case "H":
            // Hex string, low nibble first
            // Hex string, high nibble first
            if (typeof arguments[argumentPointer] === "undefined") {
              throw new Error(
                "Warning: pack() Type " + instruction + ": not enough arguments"
              );
            } else {
              argument = arguments[argumentPointer];
            }
            if (quantifier === "*") {
              quantifier = argument.length;
            }
            if (quantifier > argument.length) {
              var msg =
                "Warning: pack() Type " +
                instruction +
                ": not enough characters in string";
              throw new Error(msg);
            }

            for (i = 0; i < quantifier; i += 2) {
              // Always get per 2 bytes...
              word = argument[i];
              if (
                i + 1 >= quantifier ||
                typeof argument[i + 1] === "undefined"
              ) {
                word += "0";
              } else {
                word += argument[i + 1];
              }
              // The fastest way to reverse?
              if (instruction === "h") {
                word = word[1] + word[0];
              }
              result += String.fromCharCode(parseInt(word, 16));
            }
            argumentPointer++;
            break;

          case "c":
          case "C":
            // signed char
            // unsigned char
            // c and C is the same in pack
            if (quantifier === "*") {
              quantifier = arguments.length - argumentPointer;
            }
            if (quantifier > arguments.length - argumentPointer) {
              throw new Error(
                "Warning:  pack() Type " + instruction + ": too few arguments"
              );
            }

            for (i = 0; i < quantifier; i++) {
              result += String.fromCharCode(arguments[argumentPointer]);
              argumentPointer++;
            }
            break;

          case "s":
          case "S":
          case "v":
            // signed short (always 16 bit, machine byte order)
            // unsigned short (always 16 bit, machine byte order)
            // s and S is the same in pack
            if (quantifier === "*") {
              quantifier = arguments.length - argumentPointer;
            }
            if (quantifier > arguments.length - argumentPointer) {
              throw new Error(
                "Warning:  pack() Type " + instruction + ": too few arguments"
              );
            }

            for (i = 0; i < quantifier; i++) {
              result += String.fromCharCode(arguments[argumentPointer] & 0xff);
              result += String.fromCharCode(
                (arguments[argumentPointer] >> 8) & 0xff
              );
              argumentPointer++;
            }
            break;

          case "n":
            // unsigned short (always 16 bit, big endian byte order)
            if (quantifier === "*") {
              quantifier = arguments.length - argumentPointer;
            }
            if (quantifier > arguments.length - argumentPointer) {
              throw new Error(
                "Warning: pack() Type " + instruction + ": too few arguments"
              );
            }

            for (i = 0; i < quantifier; i++) {
              result += String.fromCharCode(
                (arguments[argumentPointer] >> 8) & 0xff
              );
              result += String.fromCharCode(arguments[argumentPointer] & 0xff);
              argumentPointer++;
            }
            break;

          case "i":
          case "I":
          case "l":
          case "L":
          case "V":
            // signed integer (machine dependent size and byte order)
            // unsigned integer (machine dependent size and byte order)
            // signed long (always 32 bit, machine byte order)
            // unsigned long (always 32 bit, machine byte order)
            // unsigned long (always 32 bit, little endian byte order)
            if (quantifier === "*") {
              quantifier = arguments.length - argumentPointer;
            }
            if (quantifier > arguments.length - argumentPointer) {
              throw new Error(
                "Warning:  pack() Type " + instruction + ": too few arguments"
              );
            }

            for (i = 0; i < quantifier; i++) {
              result += String.fromCharCode(arguments[argumentPointer] & 0xff);
              result += String.fromCharCode(
                (arguments[argumentPointer] >> 8) & 0xff
              );
              result += String.fromCharCode(
                (arguments[argumentPointer] >> 16) & 0xff
              );
              result += String.fromCharCode(
                (arguments[argumentPointer] >> 24) & 0xff
              );
              argumentPointer++;
            }

            break;
          case "N":
            // unsigned long (always 32 bit, big endian byte order)
            if (quantifier === "*") {
              quantifier = arguments.length - argumentPointer;
            }
            if (quantifier > arguments.length - argumentPointer) {
              throw new Error(
                "Warning:  pack() Type " + instruction + ": too few arguments"
              );
            }

            for (i = 0; i < quantifier; i++) {
              result += String.fromCharCode(
                (arguments[argumentPointer] >> 24) & 0xff
              );
              result += String.fromCharCode(
                (arguments[argumentPointer] >> 16) & 0xff
              );
              result += String.fromCharCode(
                (arguments[argumentPointer] >> 8) & 0xff
              );
              result += String.fromCharCode(arguments[argumentPointer] & 0xff);
              argumentPointer++;
            }
            break;

          case "f":
          case "d":
            // float (machine dependent size and representation)
            // double (machine dependent size and representation)
            // version based on IEEE754
            precisionBits = 23;
            exponentBits = 8;
            if (instruction === "d") {
              precisionBits = 52;
              exponentBits = 11;
            }

            if (quantifier === "*") {
              quantifier = arguments.length - argumentPointer;
            }
            if (quantifier > arguments.length - argumentPointer) {
              throw new Error(
                "Warning:  pack() Type " + instruction + ": too few arguments"
              );
            }
            for (i = 0; i < quantifier; i++) {
              argument = arguments[argumentPointer];
              bias = Math.pow(2, exponentBits - 1) - 1;
              minExp = -bias + 1;
              maxExp = bias;
              minUnnormExp = minExp - precisionBits;
              status =
                isNaN((n = parseFloat(argument))) ||
                n === -Infinity ||
                n === +Infinity
                  ? n
                  : 0;
              exp = 0;
              len = 2 * bias + 1 + precisionBits + 3;
              bin = new Array(len);
              signal = (n = status !== 0 ? 0 : n) < 0;
              n = Math.abs(n);
              intPart = Math.floor(n);
              floatPart = n - intPart;

              for (k = len; k; ) {
                bin[--k] = 0;
              }
              for (k = bias + 2; intPart && k; ) {
                bin[--k] = intPart % 2;
                intPart = Math.floor(intPart / 2);
              }
              for (k = bias + 1; floatPart > 0 && k; --floatPart) {
                bin[++k] = ((floatPart *= 2) >= 1) - 0;
              }
              for (k = -1; ++k < len && !bin[k]; ) {}

              // @todo: Make this more readable:
              var key =
                (lastBit =
                  precisionBits -
                  1 +
                  (k =
                    (exp = bias + 1 - k) >= minExp && exp <= maxExp
                      ? k + 1
                      : bias + 1 - (exp = minExp - 1))) + 1;

              if (bin[key]) {
                if (!(rounded = bin[lastBit])) {
                  for (
                    j = lastBit + 2;
                    !rounded && j < len;
                    rounded = bin[j++]
                  ) {}
                }
                for (
                  j = lastBit + 1;
                  rounded && --j >= 0;
                  (bin[j] = !bin[j] - 0) && (rounded = 0)
                ) {}
              }

              for (k = k - 2 < 0 ? -1 : k - 3; ++k < len && !bin[k]; ) {}

              if ((exp = bias + 1 - k) >= minExp && exp <= maxExp) {
                ++k;
              } else {
                if (exp < minExp) {
                  if (exp !== bias + 1 - len && exp < minUnnormExp) {
                    // "encodeFloat::float underflow"
                  }
                  k = bias + 1 - (exp = minExp - 1);
                }
              }

              if (intPart || status !== 0) {
                exp = maxExp + 1;
                k = bias + 2;
                if (status === -Infinity) {
                  signal = 1;
                } else if (isNaN(status)) {
                  bin[k] = 1;
                }
              }

              n = Math.abs(exp + bias);
              tmpResult = "";

              for (j = exponentBits + 1; --j; ) {
                tmpResult = (n % 2) + tmpResult;
                n = n >>= 1;
              }

              n = 0;
              j = 0;
              k = (tmpResult =
                (signal ? "1" : "0") +
                tmpResult +
                bin.slice(k, k + precisionBits).join("")).length;
              r = [];

              for (; k; ) {
                n += (1 << j) * tmpResult.charAt(--k);
                if (j === 7) {
                  r[r.length] = String.fromCharCode(n);
                  n = 0;
                }
                j = (j + 1) % 8;
              }

              r[r.length] = n ? String.fromCharCode(n) : "";
              result += r.join("");
              argumentPointer++;
            }
            break;

          case "x":
            // NUL byte
            if (quantifier === "*") {
              throw new Error("Warning: pack(): Type x: '*' ignored");
            }
            for (i = 0; i < quantifier; i++) {
              result += String.fromCharCode(0);
            }
            break;

          case "X":
            // Back up one byte
            if (quantifier === "*") {
              throw new Error("Warning: pack(): Type X: '*' ignored");
            }
            for (i = 0; i < quantifier; i++) {
              if (result.length === 0) {
                throw new Error(
                  "Warning: pack(): Type X:" + " outside of string"
                );
              } else {
                result = result.substring(0, result.length - 1);
              }
            }
            break;

          case "@":
            // NUL-fill to absolute position
            if (quantifier === "*") {
              throw new Error("Warning: pack(): Type X: '*' ignored");
            }
            if (quantifier > result.length) {
              extraNullCount = quantifier - result.length;
              for (i = 0; i < extraNullCount; i++) {
                result += String.fromCharCode(0);
              }
            }
            if (quantifier < result.length) {
              result = result.substring(0, quantifier);
            }
            break;
        }
      }
      if (argumentPointer < arguments.length) {
        var msg2 =
          "Warning: pack(): " +
          (arguments.length - argumentPointer) +
          " arguments unused";
        throw new Error(msg2);
      }

      return result;
    }

    //////////////////////////////////////////////////////////////////////
    let hashval = "";

    let AutoRedirect = document.createElement("input");
    AutoRedirect.type = "hidden";
    AutoRedirect.name = "AutoRedirect";
    AutoRedirect.value = true;
    document.getElementById("formpaiement").appendChild(AutoRedirect);
    const formElements = document.querySelectorAll(
      "#formpaiement input, #formpaiement select"
    );
    const arr = Array.from(formElements).map((input) =>
      input.getAttribute("name")
    );

    arr.shift();
    //console.log(arr);
    arr.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    //console.log(arr); // Do whatever you want with the array here
    arr.forEach((element) => {
      if (element !== "hash" && element !== "encoding") {
        let escapedParamValue = document
          .querySelector(`input[name="${element}"], select[name="${element}"]`)
          .value.replace("|", "\\|")
          .replace("\\", "\\\\");
        //var newValue = cleanSpecialCharacters(escapedParamValue);
        //console.log(newValue)
        hashval += escapedParamValue + "|";
      }
    });

    let storeKey = document.querySelector('input[name="storeKey"]').value;
    hashval += storeKey;

    // Assuming you have a suitable SHA512 function and a pack function
    let calculatedHashValue = SHA512(hashval);
    //return console.log(calculatedHashValue)
    let hash = btoa(pack("H*", calculatedHashValue));
    let hashInput = document.createElement("input");
    hashInput.type = "hidden";
    hashInput.name = "hash";
    hashInput.value = hash;
    document.getElementById("formpaiement").appendChild(hashInput);

    if (!_loading) document.getElementById("formpaiement").submit();
    //paymentRef.current?.click();
  };
  const [loading2, setLoading2] = useState(false);
  let btnRef = useRef();
  async function handleBookings(e) {
    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }
    let _location = {
      Address: location?.Address,
      Latitude: location?.Latitude,
      Longitude: location?.Longitude,
    };
    let data = [];
    if (rent?.rentType === "Per_day") {
      data.push({
        StartDate: `${
          new Date(
            new Date(bookingsDates.startDate).setDate(
              new Date(bookingsDates.startDate).getDate() + 0
            )
          )
            .toISOString()
            .split("T")[0]
        } 08:00`,
        EndDate: `${
          new Date(
            new Date(bookingsDates.endDate).setDate(
              new Date(bookingsDates.endDate).getDate() + 1
            )
          )
            .toISOString()
            .split("T")[0]
        } 08:00`,
        total_price: Number(
          diffDay *
            offerData?.offer?.available_day_hours["availablity"]?.find(
              (v) => v[TYPES["Per_day"]]
            )[TYPES["Per_day"]]
        ),
        price_type: "perDay",
        numberOfWeek: 1,
        numberOfMonth: 1,
      });
      setTotalPrice(
        Number(
          diffDay *
            offerData?.offer?.available_day_hours["availablity"]?.find(
              (v) => v[TYPES["Per_day"]]
            )[TYPES["Per_day"]]
        )
      );
    } else if (rent?.rentType === "Per_hour") {
      data = bookingHours.map((item) => {
        return {
          StartDate: item.start,
          EndDate: item.end,
          total_price: Number(
            item.total *
              offerData?.offer?.available_day_hours["availablity"]?.find(
                (v) => v[TYPES["Per_hour"]]
              )[TYPES["Per_hour"]]
          ),
          price_type: "perHour",
          numberOfWeek: 1,
          numberOfMonth: 1,
        };
      });
      const tt = data.reduce((total, item) => total + item.total_price, 0);
      setTotalPrice(Number(tt));
    } else if (rent?.rentType === "Per_week") {
      data.push({
        StartDate: `${
          new Date(
            new Date(bookingsDates.startDate).setDate(
              new Date(bookingsDates.startDate).getDate() + 0
            )
          )
            .toISOString()
            .split("T")[0]
        } 08:00`,
        EndDate: `${
          new Date(
            new Date(bookingsDates.startDate).setDate(
              new Date(bookingsDates.startDate).getDate() + 7 * week + 1
            )
          )
            .toISOString()
            .split("T")[0]
        } 08:00`,
        total_price: Number(
          week *
            offerData?.offer?.available_day_hours["availablity"]?.find(
              (v) => v[TYPES["Per_week"]]
            )[TYPES["Per_week"]]
        ),
        price_type: "perWeek",
        numberOfWeek: week,
        numberOfMonth: 1,
      });
      setTotalPrice(
        Number(
          week *
            offerData?.offer?.available_day_hours["availablity"]?.find(
              (v) => v[TYPES["Per_week"]]
            )[TYPES["Per_week"]]
        )
      );
    } else if (rent?.rentType === "Per_half_day") {
      data.push({
        StartDate: `${
          new Date(
            new Date(bookingsDates.startDate).setDate(
              new Date(bookingsDates.startDate).getDate() + 0
            )
          )
            .toISOString()
            .split("T")[0]
        } ${selectedHalfDay?.value[0]?.toString()?.padStart(2, "0") + ":00"}`,
        EndDate: `${bookingsDates.startDate} ${
          selectedHalfDay?.value[selectedHalfDay?.value?.length - 1]
            ?.toString()
            ?.padStart(2, "0") + ":00"
        }`,
        total_price: Number(
          1 *
            offerData?.offer?.available_day_hours["availablity"]?.find(
              (v) => v[TYPES["Per_half_day"]]
            )[TYPES["Per_half_day"]]
        ),
        price_type: "perHalfDay",
        numberOfWeek: 1,
        numberOfMonth: 1,
      });
      setTotalPrice(
        Number(
          1 *
            offerData?.offer?.available_day_hours["availablity"]?.find(
              (v) => v[TYPES["Per_half_day"]]
            )[TYPES["Per_half_day"]]
        )
      );
    } else if (rent?.rentType === "Per_month") {
      data.push({
        StartDate: `${
          new Date(
            new Date(bookingsDates.startDate).setDate(
              new Date(bookingsDates.startDate).getDate() + 0
            )
          )
            .toISOString()
            .split("T")[0]
        } 08:00`,
        EndDate: `${
          new Date(
            new Date(bookingsDates.endDate)?.setDate(
              new Date(bookingsDates.endDate).getDate() + (month * 30 + 1)
            )
          )
            ?.toISOString()
            ?.split("T")[0]
        } 08:00`,
        total_price: Number(
          month *
            offerData?.offer?.available_day_hours["availablity"]?.find(
              (v) => v[TYPES["Per_month"]]
            )[TYPES["Per_month"]]
        ),
        price_type: "perMonth",
        numberOfWeek: 1,
        numberOfMonth: month,
      });
      setTotalPrice(
        Number(
          month *
            offerData?.offer?.available_day_hours["availablity"]?.find(
              (v) => v[TYPES["Per_month"]]
            )[TYPES["Per_month"]]
        )
      );
    }
    //return console.log(data)
    var diff = 0;
    if (rent?.rentType === "Per_day") {
      diff = diffDay;
    } else if (rent?.rentType === "Per_hour") {
      diff = diffTime;
    }
    if (rent?.rentType === "Per_half_day") {
      diff = 1;
    } else if (rent?.rentType === "Per_week") {
      diff = diffDay;
    } else if (rent?.rentType === "Per_month") {
      diff = 1;
    }

    const check = CheckBookings(
      bookingsDates,
      offerData?.offer?.bookings,
      rent.rentType
    );
    location ? setErrorLocation(null) : setErrorLocation("Select an location");
    if (
      perDayValidator(phoneNumber, setPhoneNumberError, t) &&
      diff > 0 &&
      location &&
      check?.success
    ) {
      if (selectedValue === "online") {
        setErr(false);
        setErrDate(null);
        const PAYLOAD = {
          Dates: data,
          OfferId: id,
          Location: _location,
          Telephone: phoneNumber,
        };

        set_Loading(true);
        await axios({
          method: "POST",
          url: process.env.REACT_APP_MAIN_URL + "/bookings/get-token-booking",
          data: PAYLOAD,
          headers: {
            "x-access-token": auth?.user.token,
          },
        })
          .then((res) => {
            if (res.status == 200) {
              setToken(res.data);
              setTimeout(() => {
                HandlePayment();
              }, 3000);
            }
          })
          .catch((err) => {
            alert("An error has occurred, please try again later.");
          });
      } else {
        await axios
          .post(
            process.env.REACT_APP_MAIN_URL + "/bookings/create-bookingv2",
            {
              Dates: data,
              OfferId: id,
              Location: _location,
              Telephone: phoneNumber,
            },
            { headers: { "x-access-token": auth?.user.token } }
          )
          .then((response) => {
            if (response.status === 201) navigate("/manage-my-bookings");
          })
          .catch(() => {
            //alert("An error has occurred, please try again later.")
          });
      }

      /*await axios
        .post(
          process.env.REACT_APP_MAIN_URL + "/bookings/create-booking",
          {
            Dates: data,
            OfferId: id,
            Location: _location,
            Telephone: phoneNumber,
          },
          { headers: { "x-access-token": auth?.user.token } }
        )
        .then((response) => {
          if (response.status === 201) navigate("/manage-my-bookings");
        })
        .catch(() => {
          //alert("An error has occurred, please try again later.")
        });
      */
    } else {
      setErr(true);
      setErrDate(check?.message);
      set_Loading(false);
      diff === 0 && setErrDate("Please select valid date");
    }
  }

  const TYPES = {
    Per_day: "perDay",
    Per_hour: "perHour",
    Per_half_day: "perHalfDay",
    Per_week: "perWeek",
    Per_month: "perMonth",
  };

  const gettingoffer = useCallback(async (type, date) => {
    await axios
      .post(
        process.env.REACT_APP_MAIN_URL + "/offers/NewCheckout",
        {
          offer_id: id,
          date: date,
          type_booking: type || "",
        },
        { headers: { "x-access-token": auth?.user.token } }
      )
      .then((response) => {
        if (response.status === 200) {
          /*console.log(TYPES[type]);
          console.log(
            response.data?.offer?.available_day_hours["availablity"]?.find(
              (v) => v[TYPES[type]]
            )[TYPES[type]]
          );*/
          console.log("dd");
          setOfferData({
            offer: response.data.offer,
            availableHours: response.data.availableHours,
          });
          const newLocations = response.data.offer?.vehicles?.location?.map(
            (l) => {
              return {
                ...l,
                id: Math.random().toString(16).slice(2),
              };
            }
          );
          setlocations(newLocations);
          setPhoneNumber(response.data.user?.telephone);
          setUser(response?.data?.user);
          rent?.rentType === "Per_day" &&
            setBookingsDates({
              startDate:
                rent?.rentType === "Per_day"
                  ? new Date(systemDate.setDate(systemDate.getDate() + 1))
                      .toISOString()
                      .slice(0, 10)
                  : new Date(systemDate.setDate(systemDate.getDate() + 0))
                      .toISOString()
                      .slice(0, 10),
              endDate:
                rent?.rentType === "Per_day"
                  ? new Date(systemDate.setDate(systemDate.getDate() + 0))
                      .toISOString()
                      .slice(0, 10)
                  : new Date(systemDate.setDate(systemDate.getDate() + 0))
                      .toISOString()
                      .slice(0, 10),
            });
          const _bookings = response.data?.offer?.bookings?.map((b) => {
            return {
              startDate: new Date(b?.start_date).toISOString().split("T")[0],
              endDate: new Date(b?.end_date).toISOString().split("T")[0],
            };
          });
          setBookings(_bookings);
          if (response.data.user?.telephone) setPhoneIsExist(true);
          if (response.data.availableHours)
            setHours(GenerateArrayOfHours(response.data.availableHours));
          setSummaryInfo({
            ...summaryInfo,
            initialPrice: response.data?.offer?.available_day_hours[
              "availablity"
            ]?.find((v) => v[TYPES[type]])[TYPES[type]],
            /*type === "Per_day"
                ? response?.data.offer?.price_perDay
                : response?.data.offer?.price_perHour*/ priceType: type,
          });
        }
      })
      .catch(() => {
        //alert("An error has occurred, please try again later.")
      });
  }, []);

  const GenerateArrayOfHours = (arr) => {
    return arr
      ?.map((item, index, elements) => {
        const next = elements[index + 1];
        let h = (_d) => {
          if (_d === 24) return Number(0)?.toString().padStart(2, "0");
          else return _d?.toString().padStart(2, "0");
        };
        let m = Number(0)?.toString().padStart(2, "0");
        if (index !== elements.length - 1) {
          if (item === next - 1)
            return {
              id: index,
              start: `${h(item)}:${m}`,
              end: `${h(next)}:${m}`,
              selected: false,
            };
          else
            return {
              id: index,
              start: `${h(item)}:${m}`,
              end: `${h(item + 1)}:${m}`,
              selected: false,
            };
        }
      })
      .filter((_t) => _t !== undefined && _t);
  };

  useEffect(() => {
    setLoading(true);
    gettingoffer("Per_day", new Date()?.toISOString()?.slice(0, 10));

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [diffDay, setDiffDay] = useState(1);
  const [diffTime, setDiffTime] = useState(0);

  const CalcDiff = (type, start, end) => {
    if (type === "Per_day") {
      const diff = Math.abs(new Date(end) - new Date(start));
      const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    } else {
      const diff = Math.abs(new Date(end) - new Date(start));
      const diffHours = Math.ceil(diff / (1000 * 60 * 60));
      return diffHours;
    }
  };

  const HandleChange = (newValue) => {
    if (rent?.rentType === "Per_day") {
      setBookingsDates(newValue);
      setDiffDay(CalcDiff("Per_day", newValue.startDate, newValue.endDate));
    } else {
      setBookingsDates(newValue);
      const diff = bookingHours
        ?.map((_h) => _h.total)
        .reduce((a, b) => a + b, 0);
      setDiffTime(diff);
    }
    setLoading(true);
    gettingoffer(
      rent?.rentType,
      new Date(newValue?.startDate)?.toISOString()?.slice(0, 10)
    );
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const [selectedHalfDay, setSelectedHalfDay] = useState({
    type: null,
    value: [],
  });
  const HandleSelectHalfDay = (type, value) => {
    return setSelectedHalfDay({ type: type, value: value });
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join("-") +
      " " +
      [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(":")
    );
  }
  const getSequentialHours = (arr) => {
    let result = [];
    if (arr.length > 0) {
      let start = arr[0]?.start;
      let end = arr[0]?.end;
      let date = new Date(bookingsDates.startDate);
      for (let i = 1; i < arr.length; i++) {
        if (arr[i].start === end) {
          end = arr[i].end;
        } else {
          result.push({
            start: formatDate(
              new Date(date.setHours(Number(start?.split(":")[0]), 0, 0, 0))
            ),
            end: formatDate(
              new Date(date.setHours(Number(end?.split(":")[0]), 0, 0, 0))
            ),
            total: Math.abs(
              Number(end?.split(":")[0]) - Number(start?.split(":")[0])
            ),
          });
          start = arr[i].start;
          end = arr[i].end;
        }
      }
      result.push({
        start: formatDate(
          new Date(date.setHours(Number(start?.split(":")[0]), 0, 0, 0))
        ),
        end: formatDate(
          new Date(date.setHours(Number(end?.split(":")[0]), 0, 0, 0))
        ),
        total: Math.abs(
          Number(end?.split(":")[0]) - Number(start?.split(":")[0])
        ),
      });
    }
    return result;
  };
  const onToggleSelected = (id) => {
    let newHours = [...hours];
    const findIndex = newHours.findIndex((_h) => _h?.id === id);
    let item = newHours[findIndex];
    item.selected = !item.selected;
    const sorted = newHours
      .filter((_h) => _h.selected)
      .sort((a, b) => a.id - b.id);
    const cleanArr = getSequentialHours(sorted);
    setBookingHours(cleanArr);
    const diff = cleanArr?.map((_h) => _h.total).reduce((a, b) => a + b, 0);
    setDiffTime(diff);
    return setHours(newHours);
  };

  const bookingType = {
    Per_day: "Day",
    Per_hour: "Hour",
    Per_half_day: "Half Day",
    Per_week: "Week",
    Per_month: "Month",
  };

  const keyTypes = {
    "perHour" : {
      name : "Hour",
      value : "Per_hour"
    },
    "perHalfDay" : {
      name : "Half Day",
      value : "Per_half_day"
    },
    "perDay" : {
      name : "Day",
      value : "Per_day"
    },
    "perWeek" : {
      name : "Week",
      value : "Per_week"
    },
    "perMonth" : {
      name : "Month",
      value : "Per_month"
    }
  }
  const extractKeys = (arr) => arr?.reduce((keys, obj) => {
    const objKeys = Object.keys(obj);
    return keys.concat(objKeys);
  }, [])

  return (
    <div className="flex flex-wrap px-4 py-2 h-auto w-full justify-center gap-6 mt-6">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Dweera | Checkout`}</title>
        <meta
          name="description"
          content={`Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing`}
        />
        <meta
          name="keywords"
          content="Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing"
        />
      </Helmet>

      <form
        name="formpaiement"
        id="formpaiement"
        action="https://payment.cmi.co.ma/fim/est3Dgate"
        method="post"
      >
        <input
          hidden
          ref={paymentRef}
          type="button"
          value="valider"
          onClick={HandlePayment}
        />
        <input hidden type="text" name="oid" value={oid} />
        <input hidden type="text" name="clientid" value="600004123" />
        <input hidden type="text" name="storeKey" value="PWD_dweera@2024" />
        <input hidden type="text" name="amount" value={totalPrice} />
        <input
          hidden
          type="text"
          name="okUrl"
          value={`${process.env.REACT_APP_MAIN_URL}/bookings/payment?token=${token}&state=ok&base=${process.env.REACT_APP_DOMAINE}`}
        />
        <input
          hidden
          type="text"
          name="failUrl"
          value={`${process.env.REACT_APP_MAIN_URL}/bookings/payment?token=${token}&state=fail&base=${process.env.REACT_APP_DOMAINE}`}
        />
        <input
          hidden
          type="text"
          name="shopUrl"
          value={`${process.env.REACT_APP_MAIN_URL}/offers/cmi-urls?type=shopUrl&base=${process.env.REACT_APP_DOMAINE}`}
        />
        <input hidden type="text" name="TranType" value="PreAuth" />
        <input
          hidden
          type="text"
          name="callbackUrl"
          value={`${process.env.REACT_APP_MAIN_URL}/offers/cmi-callback`}
        />
        <input hidden type="text" name="currency" value="504" />
        <input hidden type="text" name="storetype" value="3D_PAY_HOSTING" />
        <input hidden type="text" name="hashAlgorithm" value="ver3" />
        <input hidden type="text" name="lang" value="fr" />
        <input
          hidden
          type="text"
          name="BillToName"
          value={`${cleanSpecialCharacters(user?.first_name)} ${cleanSpecialCharacters(user?.last_name)}`}
        />
        <input hidden type="text" name="tel" value={user?.telephone} />
        <input hidden type="text" name="email" value={user?.email} />
        <input hidden type="text" name="price2" value={totalPrice} />
        <input hidden type="text" name="qty2" value={1} />
        <input hidden type="text" name="total2" value={totalPrice} />
        <input hidden type="text" name="desc2" value="desc" />
        <input hidden type="text" name="id2" value={id} />
        <input hidden type="text" name="itemNumber2" value="itemNumber2" />
        <input hidden type="text" name="productCode2" value="productCode2" />
      </form>

      <div className="w-full h-[300px] md:h-[400px] lg:h-[700px] lg:w-6/12">
        <LocationMap
          vehicle={offerData?.offer?.vehicles}
          height={"100%"}
          isView={false}
          location={location}
          locations={locations}
          setLocation={setLocation}
        />
      </div>
      <div className="w-full bg-grey-100 lg:w-5/12 text-white flex flex-col gap-4">
        <div className="mb-3 flex -mx-2 gap-2 justify-start items-center flex-wrap">
          <div className="px-2" onClick={() => handleRadioChange("cash")}>
            <label htmlFor="type2" className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-indigo-500"
                value="cash"
                checked={selectedValue === "cash"}
              />
              <span className="text-black ml-3 font-bold">Pay Cash</span>
            </label>
          </div>
          <div className="px-2" onClick={() => handleRadioChange("online")}>
            <label htmlFor="type1" className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-indigo-500"
                value="online"
                checked={selectedValue === "online"}
              />
              <img
                src="/images/tn_verified_by_visa.png"
                className="h-8 ml-3"
                alt=""
              />
              <img
                src="/images/secure_code_logo.png"
                className="h-8 ml-3"
                alt=""
              />
              <img src="/images/logo_cmi.png" className="h-8 ml-3" alt="" />
            </label>
          </div>
        </div>

        <div className="w-full bg-gray-200 p-4 rounded-md">
          <label
            htmlFor="avaibilityType"
            className="block mb-2 text-sm font-semibold text-gray-900"
          >
            {t("Type")}
            <sup className="text-red-600">*</sup>
          </label>
          <select
            value={rent.rentType}
            placeholder="Select a booking type"
            id="avaibilityType"
            className="relative w-full select-text cursor-default rounded-lg bg-white py-2 text-gray-800 pl-3 pr-10 text-left focus:outline-none border border-gray-300 sm:text-sm"
            onChange={(e) => {
              setRent({
                ...rent,
                rentType: e.currentTarget.value,
              });
              setErr(false);
              setErrDate(null);
              gettingoffer(
                e.currentTarget.value,
                new Date()?.toISOString()?.slice(0, 10)
              );
            }}
          >
            <option
              defaultValue
              disabled
              value={"none"}
              className="italic text-gray-500"
            >
              {t("Select a booking type")}
            </option>
            {
              extractKeys(offerData?.offer?.available_day_hours["availablity"])?.map((v,i) => 
                <option key={i} value={keyTypes[v]?.value}>{t(keyTypes[v]?.name)}</option>
              )
            }
          </select>
          <ErrorDisplayer error={rent?.rentTypeError} />
        </div>
        {rent?.rentType != "none" && (
          <div className="w-full bg-gray-200 p-4 rounded-md">
            <label
              htmlFor="Phone number"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              {t("Phone number")} <sup className="text-red-600">*</sup>
            </label>
            <input
              type="number"
              id="Phone number"
              className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
              value={phoneNumber}
              placeholder={t("Phone number")}
              disabled={phoneIsExist}
              onChange={(e) => {
                setPhoneNumber(e.currentTarget.value);
              }}
            />
            <ErrorDisplayer error={phoneNumberError} />
          </div>
        )}
        {[
          "Per_hour",
          "Per_half_day",
          "Per_day",
          "Per_week",
          "Per_month",
        ].includes(rent?.rentType) ? (
          <>
            <div className="w-full bg-gray-200 p-4 rounded-md">
              <label
                htmlFor="duration"
                className="block mb-2 text-sm font-semibold text-gray-900"
              >
                {t("Duration")} <sup className="text-red-600">*</sup>
              </label>
              {console.log(offerData)}
              {!loading && bookingsDates ? (
                <>
                  <MyDatepicker
                    Type={rent?.rentType || "Per_day"}
                    Available={offerData?.offer?.available_day_hours}
                    AvailableHalf={offerData?.availableHours}
                    AvailableH={hours}
                    Value={bookingsDates || null}
                    HandleChange={HandleChange}
                    HandleSelectHalfDay={HandleSelectHalfDay}
                    SelectedHalfDay={selectedHalfDay}
                    OnToggleSelected={onToggleSelected}
                    Bookings={bookings || []}
                    Week={week}
                    SetSelectedWeek={setWeek}
                    Month={month}
                    SetSelectedMonth={setMonth}
                    t={t}
                  />
                  {errDate && (
                    <div className="flex justify-center mt-4 text-center items-center px-2 py-2 bg-red-200 text-gray-800 text-sm font-medium rounded-md">
                      <p>{errDate}</p>
                    </div>
                  )}
                </>
              ) : null}
            </div>
            <div className="w-full bg-gray-200 p-4 rounded-md">
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                {t("Location")} <sup className="text-red-600">*</sup>
              </label>
              {!loading ? (
                <SelectLocation
                  Loactions={locations}
                  Selected={location}
                  setLocation={setLocation}
                />
              ) : null}
              {errLocation && <ErrorDisplayer error={errLocation} />}
            </div>
            <div className="w-full bg-gray-200 p-4 rounded-md">
              <Summary
                infos={{
                  type: bookingType[rent?.rentType],
                  diff: () => {
                    if (rent?.rentType == "Per_day") {
                      return diffDay;
                    }
                    if (rent?.rentType == "Per_hour") {
                      return diffTime;
                    }
                    if (rent?.rentType == "Per_half_day") {
                      return 1;
                    }
                    if (rent?.rentType == "Per_week") {
                      return week;
                    }
                    if (rent?.rentType == "Per_month") {
                      return month;
                    }
                  },
                  initialPrice: summaryInfo?.initialPrice,
                }}
              />
            </div>

            <button
              type="button"
              className={`border border-transparent text-white font-bold flex justify-center items-center gap-2 py-2 rounded w-full bg-lime-600 hover:bg-lime-700`}
              onClick={!_loading ? handleBookings : null}
              disabled={_loading}
              ref={btnRef}
            >
              {_loading ? (
                "Loading..."
              ) : (
                <>
                  <LockClosedIcon className="w-4 h-4" />
                  {t("Continue")}
                </>
              )}
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default NewCheckOut;
