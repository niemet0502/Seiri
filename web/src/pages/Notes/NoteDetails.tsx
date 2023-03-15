import { useContext, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsBook, BsCodeSlash, BsDot } from "react-icons/bs";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IconButton } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { DropdownItem } from "../../components/DropdownItem";
import { Loader } from "../../components/Loader";
import { PageHeader } from "../../components/PageHeader";
import { ApiClientContext } from "../../provider/apiClientProvider";

import { createTheme } from "@uiw/codemirror-themes";
import CodeMirror from "@uiw/react-codemirror";

import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import MarkdownPreview from "@uiw/react-markdown-preview";

const code = `

[Docker Tutorial: Create a CI/CD Pipeline](https://www.taniarascia.com/continuous-integration-pipeline-docker/)  

[Learn what's is a reverse proxy](https://twitter.com/Franc0Fernand0/status/1624425248937443332)  

[Crafting container images without Dockerfiles](https://ochagavia.nl/blog/crafting-container-images-without-dockerfiles/)  

[what is CI/CD](https://www.redhat.com/en/topics/devops/what-is-ci-cd)  

[A Beginner’s Introduction to DevOps](https://deborahemeni.medium.com/a-beginners-introduction-to-devops-9f552826113f)  

[what's Redis](https://learningdaily.dev/what-is-redis-get-started-with-data-types-commands-and-more-98b30266740c)  

[How API Gateway works](https://medium.com/buildpiper/how-do-api-gateways-work-3b989fdcd751)  

[Learn docker](https://www.linkedin.com/posts/jamesspurin_kubernetes-docker-cloudnative-activity-7040997294573244416-zval?utm_source=share&utm_medium=member_desktop)
`;

const myTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#191a23",
    caret: "white",
  },
  styles: [],
});

export const NoteDetails: React.FC = () => {
  const { apiClient } = useContext(ApiClientContext);
  const { noteId } = useParams<{ noteId: string }>();

  const [readingView, setReadingView] = useState(true);

  const { data, isLoading } = useQuery(["notes", noteId], () =>
    apiClient.getNote(noteId)
  );

  const [note, setNote] = useState(code);

  return (
    <div className="flex page-content flex-2">
      <div className="note flex flex-column" style={{ zIndex: "5" }}>
        <PageHeader>
          <h4>2023 Roadmap &gt; Thot v0</h4>
          <Dropdown
            left="-150px"
            width="150px"
            trigger={(toggle) => (
              <IconButton handler={toggle}>
                <BiDotsHorizontalRounded />
              </IconButton>
            )}
          >
            <DropdownItem handler={() => setReadingView((prev) => !prev)}>
              <BsBook /> Reading view
            </DropdownItem>

            <DropdownItem>
              <BsCodeSlash /> Source code
            </DropdownItem>

            <DropdownItem>
              <AiOutlineEye /> Instant preview
            </DropdownItem>

            <DropdownItem>
              <AiOutlineDelete /> Delete
            </DropdownItem>
          </Dropdown>
        </PageHeader>

        {isLoading && (
          <div className="flex justify-content-center mt-2">
            <Loader />
          </div>
        )}

        {!isLoading && data && (
          <>
            <div
              className="note-header"
              style={{ position: "relative", zIndex: "-1" }}
            >
              <textarea>{data.title}</textarea>
              <div className="br"></div>
              <div className="flex mt-1 align-items-center">
                <span>
                  Created on <span className="markee">{data.createdAt}</span>
                  <BsDot />
                </span>
                <span>
                  Last Edited <span className="markee">29 mins</span>
                  <BsDot />
                </span>
                <span>
                  Project : <span className="markee bold"></span>
                </span>
              </div>
            </div>
            <div
              className="note-body flex flex-1"
              style={{ position: "relative", zIndex: "-1" }}
            >
              {readingView && (
                <MarkdownPreview
                  style={{ width: "100%", background: "transparent" }}
                  source={note}
                />
              )}

              {!readingView && (
                <CodeMirror
                  minHeight="100%"
                  minWidth="100%"
                  maxWidth="100%"
                  style={{ overflow: "hidden", whiteSpace: "pre-wrap" }}
                  value={note}
                  theme={myTheme}
                  className="cursor-color"
                  extensions={[
                    markdown({
                      base: markdownLanguage,
                      codeLanguages: languages,
                    }),
                  ]}
                  onChange={(value, viewUpdate) => {
                    setNote(value);
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
