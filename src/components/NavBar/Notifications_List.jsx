import * as React from "react";
import { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";

export default function AccountMenu(props) {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <div
        style={{
          minWidth: "325px",
        }}
      >
        <span
          className={visible ? "fadeIn" : "fadeOut"}
          onClick={() => setVisible(false)}
        >
          <div className="Notificationstyle">
            <div className="NotificationDiv">
              <div>
                <span tabIndex={0} type="button" className="NotificationSpan">
                  <div>
                    <div className="NotificationDiv2">
                      <div>{props.Notification.Notification_Title}</div>
                      <Tooltip title={props.Notification.Notification_Text}>
                        <div className="NotificationDiv3">
                          {props.Notification.Notification_Text}
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </span>
              </div>
              <div className="NotificationTime">
                {props.Notification.Notification_Time.slice(0, 5)}
              </div>
            </div>
          </div>
        </span>
      </div>
    </>
  );
}
