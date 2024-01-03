import { ReactNode } from "react";

import styles from "./IssueCardComponent.module.css"
export interface IssueCardComponentProps {
  title: string;
  labels: Array<string>;
  number: number;
  state: 'open' | 'closed' ;
  userName: any;
}

const IssueCardComponent = ({ title, labels, number, state, userName }: IssueCardComponentProps): ReactNode => (
  <div className={styles.issueCardContainer}>
    <div className={styles.topSection}>
      <div className={styles.row}>
        <div className={state === 'open' ? styles.open : styles.closed}/>
        <p className={styles.issueTitle}>{title}</p>
      </div>
      <div className={styles.row}>
        {labels.map((label) => <div className={styles.label} key={label}>{label}</div>)}
      </div>
    </div>
    <div>
      <p>#{number} opened 4 hours ago by {userName}</p>
    </div>
  </div>
)

export default IssueCardComponent;