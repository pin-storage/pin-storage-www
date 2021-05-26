import styles from "~/components/ProgressCard.module.scss";

import * as React from "react";
import * as U from "~/common/utilities";
import * as C from "~/common/constants";

const ProgressCard = ({ deal, transfer, chain, marketing, contentId }) => {
  const isOnChain = deal.dealId > 0;

  let message = `DealOnChain`;
  if (transfer && transfer.statusMessage) {
    if (!deal.dealId) {
      message = transfer.statusMessage;

      if (message === "Completed") {
        message = "TransferFinish";
      }
    }

    if (chain && chain.sectorStartEpoch && Number(chain.sectorStartEpoch) > 0) {
      message = `ActiveOnChain`;
    }
  }

  if (deal && deal.failed && transfer.status === 6) {
    message = "FailAfterTransfer";
  }

  let topStyle = { background: C.statusColors[Number(transfer.status)] };
  if (transfer) {
    if (deal.failed && transfer.status === 6) {
      topStyle.background = `var(--status-6-failed)`;
    }

    if (message === `DealOnChain`) {
      topStyle.background = `var(--status-success)`;
    }

    if (message === `ActiveOnChain`) {
      topStyle.background = `var(--status-success-bright)`;
    }
  }

  let minerURL = null;
  if (deal && deal.dealId) {
    minerURL = `/errors/${contentId}`;
    if (message !== "FailAfterTransfer") {
      minerURL = `/deals/${deal.dealId}`;
    }
  }

  return (
    <div className={U.classNames(marketing ? styles.marketing : styles.card)}>
      <div className={styles.container}>
        <div className={styles.top} style={topStyle}>
          {transfer ? (
            <p className={styles.cardHeading}>
              <a style={{ fontWeight: 700 }} href={`/miners/stats/${deal.miner}`}>
                {deal.miner}
              </a>{" "}
              ⇄ {minerURL ? <a href={minerURL}>{message}</a> : message}
            </p>
          ) : (
            <p className={styles.cardHeading}>NoTransferAndFail ⇄ {deal.miner}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
