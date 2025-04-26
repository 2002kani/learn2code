import { Text, Timeline } from "@mantine/core";
import i18next from "i18next";
import { Badge } from "react-bootstrap";
import { IArticleDetailsDTO, IArticleRevisionDTO } from "@/generatedCode/pbd-core/pbd-core-api";
import { qmBaseIcons } from "../../../../ClientApp/shared/components/icons/qmBaseIcons";
import { ArticleRevisionApprovalVM } from "../../../../services/articles/models/articleRevisionApprovalVm";
import { DateTimeLuxonHelpers } from "../../../../utils/dateTimeLuxonHelpers";
interface MyTimelineItem {
  title: React.ReactNode;
  createdAt: string;
  icon: React.ReactNode;
  container?: React.ReactNode;
}
function getTimelineEvents(
  articleRevision: IArticleRevisionDTO,
  approvals: ArticleRevisionApprovalVM[],
): MyTimelineItem[] {
  const events: MyTimelineItem[] = [];
  if (articleRevision.publishProcessStopped && articleRevision.publishProcessStoppedAt) {
    events.push({
      title: i18next.t("Process stopped"),
      createdAt: DateTimeLuxonHelpers.convertUtcToDateTime(articleRevision.publishProcessStoppedAt),
      icon: <qmBaseIcons.StopCircle color="danger" />,
    });
  }
  if (articleRevision.isPublished && articleRevision.publishedAt) {
    events.push({
      title: (
        <span>
          {i18next.t("Published as")}{" "}
          <Badge bg="primary">
            <qmBaseIcons.Revision /> {articleRevision.version}
          </Badge>
        </span>
      ),
      createdAt: DateTimeLuxonHelpers.convertUtcToDateTime(articleRevision.publishedAt),
      icon: <qmBaseIcons.Globe color="success" />,
    });
  }
  approvals
    .filter((x) => x.approvedAt != null)
    .forEach((x) =>
      events.push({
        title: `${x.approver.fullName} ${x.isApproved ? i18next.t("has approved") : i18next.t("has rejected")}`,
        createdAt: DateTimeLuxonHelpers.convertUtcToDateTime(x.approvedAt),
        icon: x.isApproved ? <qmBaseIcons.CheckSquare color="success" /> : <qmBaseIcons.Alert color="danger" />,
        container: x.comment != "" ? x.comment : undefined,
      }),
    );
  if (articleRevision.isPublishProcessStarted && articleRevision.lastUpdatedAt) {
    events.push({
      title: i18next.t("Publish process started"),
      createdAt: DateTimeLuxonHelpers.convertUtcToDateTime(articleRevision.lastUpdatedAt),
      icon: <qmBaseIcons.Play />,
    });
  }
  events.push({
    title: `${articleRevision.createdBy?.fullName} ${i18next.t("has created this revision")}`,
    createdAt: DateTimeLuxonHelpers.convertUtcToDateTime(articleRevision.createdAt),
    icon: <qmBaseIcons.Plus />,
  });

  const sortierteEvents = events.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return sortierteEvents;
}
interface IProps {
  article: IArticleDetailsDTO;
  articleRevision: IArticleRevisionDTO;
  approvals: ArticleRevisionApprovalVM[] | undefined;
}
function PublishProcessTimeline(props: IProps) {
  const events = getTimelineEvents(props.articleRevision, props.approvals ?? []);
  return (
    <Timeline bulletSize={24}>
      {events.map((x, i) => (
        <Timeline.Item key={i} title={x.title} bullet={x.icon}>
          {x.container}
          <Text size="xs" mt={4}>
            {x.createdAt}
          </Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
export default PublishProcessTimeline;
