import React from "react";
import { v4 as uuidv4 } from 'uuid';

export default function CMI({RefAmount, Total,User,HandelSubmit }) {
  const [oid, setOid] = useState('');

  useEffect(() => {
    // Generate a UUID
    const uniqueID = uuidv4();
    console.log(uniqueID)
    setOid(uniqueID);
  }, []); 

  return (
    <React.Fragment>

      <form
        name="formpaiement"
        id="formpaiement"
        action="https://payment.cmi.co.ma/fim/est3Dgate"
        method="post"
      >

        <input hidden type="text" name="oid" value={oid} />

        <input hidden type="text" name="clientid" value="600004123" />

        <input hidden type="text" name="storeKey" value="PASS1234" />

        <input hidden ref={RefAmount} type="text" name="amount" value={Total} />
        <input
          hidden
          type="text"
          name="okUrl"
          value={`${process.env.REACT_APP_DOMAINE}/payment-process-success`}
        />

        <input
          hidden
          type="text"
          name="failUrl"
          value={`${process.env.REACT_APP_DOMAINE}/payment-process-fail`}
        />

        <input
          hidden
          type="text"
          name="shopUrl"
          value={`${process.env.REACT_APP_DOMAINE}/`}
        />

        <input hidden type="text" name="TranType" value="PreAuth" />

        <input
          hidden
          type="text"
          name="callbackUrl"
          value={`${process.env.REACT_APP_DOMAINE}/`}
        />

        <input hidden type="text" name="currency" value="504" />

        <input hidden type="text" name="storetype" value="3D_PAY_HOSTING" />

        <input hidden type="text" name="hashAlgorithm" value="ver3" />

        <input hidden type="text" name="lang" value="fr" />

        <input hidden type="text" name="BillToName" value={`${User?.first_name} ${User?.last_name}`} />

        <input hidden type="text" name="tel" value={User?.telephone} />

        {/*<input type="text" name="price2" value="1.10" />
        <input type="text" name="qty2" value="2" />
        <input type="text" name="total2" value="2.20" />
        <input type="text" name="desc2" value="desc" />
        <input type="text" name="id2" value="id2" />
        <input type="text" name="itemNumber2" value="itemNumber2" />
        <input type="text" name="productCode2" value="productCode2" />
        <input type="text" name="price3" value="1.10" />
        <input type="text" name="qty3" value="3" />
        <input type="text" name="total3" value="3.30" />
        <input type="text" name="desc3" value="desc" />
        <input type="text" name="itemNumber3" value="itemNumber3" />
        <input type="text" name="productCode3" value="productCode3" />*/}
      </form>
    </React.Fragment>
  );
}
