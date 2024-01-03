import { MutableRefObject, ReactNode, useEffect, useRef } from "react";

import styles from "./IssueCardComponent.module.css"

export interface IssueCardComponentProps {
  title: string;
  labels: Array<string>;
  number: number;
  state: 'open' | 'closed' ;
  userName: any;
  isLast: boolean;
  newLimit: () => void;
}

const IssueCardComponent = ({ title, labels, number, state, userName, isLast = false, newLimit }: IssueCardComponentProps): ReactNode => {
  const cardRef: MutableRefObject<any> = useRef(); // A better typing could be found fo sure, but the clock is running!

  useEffect((): void => {
    if (!cardRef?.current) return;

    const observer: IntersectionObserver = new IntersectionObserver(([entry]): void => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast])

  return (
    <div className={styles.issueCardContainer} ref={cardRef}>
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
}

export default IssueCardComponent;