"use client"
import {useEffect, useState} from "react";

import TextInputComponent from "@/app/components/TextInputComponent/TextInputComponent";
import IssueCardComponent from "@/app/components/IssueCardComponent/IssueCardComponent";

import {PropagateLoader} from "react-spinners";

import IssuesService from "@/app/services/issues.service";

import styles from './page.module.css'

export default function Home() {
  const issueService: IssuesService = new IssuesService();

  const [ searchString, setSearchString ] = useState('');
  const [ issues, setIssues ] = useState([]);
  const [ page, setPage ] = useState(0);
  const [ loading, setLoading ] = useState(false)

  useEffect((): void => {
    setLoading(true)
    searchIssuesByOrgAndRepo().then((newIssues) => {
      if (!newIssues.length) return setIssues([]);
      setIssues((prev) => [...prev, ...newIssues]);
      setLoading(false)
    }).catch((error): void => {
      console.error(error);
      setIssues([])
      setLoading(false)
    });
  }, [searchString, page]);


  const searchIssuesByOrgAndRepo = async () => {
    if (!searchString) return;
    const organization: string | null = getOrganization(searchString);
    const repository: string | null = getRepository(searchString);

    return await issueService.getRepositoryIssues({organization, repository, page})
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

  const renderMessage = () => {
    if (!searchString && loading) return renderWelcomeMessage();
    return renderNotFoundMessage();
  }

  const renderNotFoundMessage = () => (
    <>
      <p>Oh! We are sorry, or not. Issues not found this time. So maybe it's a good time to grab a beer and chat with your team. You're doing a great job!</p>
    </>
  )

  const renderWelcomeMessage = () => (
    <>
      <p>Hi! Search a GitHub organization/repository to find the issues!</p>
    </>
  )


  const renderIssues = () => {
    return issues.map((issue, index: number) => <IssueCardComponent
      key={issue.id}
      title={issue.title}
      labels={issue.labels.map((label) => label.name)}
      number={issue.number}
      state={issue.state}
      userName={issue.user?.login}
      isLast={index === issues.length - 1}
      newLimit={() => setPage(page + 1)}
    />)
  }

  return (
    <main className={styles.main}>
    <TextInputComponent handleAction={(string: string) => setSearchString(string)}/>
      {
        !issues.length ? loading ? null : renderMessage(): renderIssues()
      }
      <div className={styles.loaderContainer}>
        <PropagateLoader color='#FFFFFF' loading={loading}/>
      </div>
    </main>
  )
}