import React from "react";
import { PROJECT_URL, defaultProjectName } from "../../constants";
import { useFormsContext } from "../../FormsContext";
import { UrlContent, DomainName, ProjectUrlWrapper } from "./styles";

function ProjectUrl() {
  // TODO: need get projectUrl from socket response or from store
  const { field } = useFormsContext();
  const projectUrl = "some-project-name";

  return (
    <UrlContent>
      <ProjectUrlWrapper ellipsis={true} title={projectUrl}>
        {projectUrl || defaultProjectName}
      </ProjectUrlWrapper>
      <DomainName>.{PROJECT_URL}</DomainName>
    </UrlContent>
  );
}

export default ProjectUrl;
