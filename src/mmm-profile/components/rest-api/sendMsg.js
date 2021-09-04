import { useEffect, useState } from "react";
import { config } from "./Constants";

export default function sendMsg(msg=null, senderId=null, recipientMemberId=null) {
  const wp_root = wpApiSettings.root; //config.url.API_URL;
  const url = "contact-form-7/v1/contact-forms/"+config.contactFormId+"/feedback";
  const formData = new FormData();

  formData.append("sender-id", senderId);
  formData.append("form-name", "contact_to_member");
  formData.append("your-name", "dummy@monomakersmeet");
  formData.append("your-email", "dummy@monomakersmeet.com");
  formData.append("recipient-member-id", recipientMemberId);
  formData.append("your-message", msg);
  formData.append("recipient-email", "dummy@monomakersmeet.com");

  // 送信用データを設定
  const options = {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  // ここで明示的に消してあげる
  delete options.headers["Content-Type"];

  // 設定したデータをPOST
  return fetch(wp_root + url, options);

  // .then((response) => return response.json());
}
