"use client"

import styles from './page.module.css'
import TextInputComponent from "@/app/components/TextInputComponent/TextInputComponent";
import IssuesService from "@/app/services/issues.service";
import {useState} from "react";

export default function Home() {
  const issueService: IssuesService = new IssuesService();

  const [ issues, setIssues ] = useState();

  const searchIssuesByOrgAndRepo = async ( searchString: string ) => {
    if (!searchString) return;

    const organization: string | null = getOrganization(searchString);
    const repository: string | null = getRepository(searchString);

    const issues = await issueService.getRepositoryIssues({ organization, repository })
    setIssues(issues)
  }

  const getOrganization = (searchString): null | string => {
    const splitString = searchString.split('/');
    if (!splitString.length) {
      return null;
    }

    return splitString[0];
  }

  const getRepository = (searchString): null | string => {
    const splitString = searchString.split('/');
    if (splitString.length <= 1) {
      return null;
    }

    return splitString[1];
  }


  return (
    <main className={styles.main}>
      <TextInputComponent handleAction={searchIssuesByOrgAndRepo} />
    </main>
  )
}
