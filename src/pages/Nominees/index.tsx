/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { Container, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  CustomButton,
  CustomPagination,
  CustomDropdown,
  CustomModal,
  NomineeCard,
  CustomToast,
} from "components";
import { CustomDropdownItemProps } from "components/CustomDropdown/types";
import { NomineeHelper } from "helpers/nomineeHelper";
import { splitData } from "utils/splitData";
import { NomineeModel } from "models/Nominee";
import { useNominee } from "context/nominee";
import { FilterType } from "helpers/typeHelper";
import "./styles.scss";

export const Nominees: React.FC = () => {
  const navigate = useNavigate();
  const { nominees, setNominees } = useNominee();
  const nomineeHelper = useMemo(
    () => new NomineeHelper(nominees, setNominees),
    [nominees, setNominees]
  );

  const [filter, setFilter] = useState<FilterType>(null);
  const [isRemoveModalShown, setIsRemoveModalShown] = useState<boolean>(false);
  const [isToastShown, setIsToastShown] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [removableNominee, setRemovableNominee] = useState<NomineeModel>();
  const [removedNominee, setRemovedNominee] = useState<NomineeModel>();
  const [nomineeFetcher, setNomineeFetcher] = useState<number>(0);

  const splittedNominees = useMemo(
    () => splitData(nominees, currentPage),
    [nominees, currentPage]
  );

  const handleShowRemoveNomineeModal = () => {
    setIsRemoveModalShown((prevState) => !prevState);
  };
  const onDownvote = (nominee: NomineeModel) => nomineeHelper.downvote(nominee);
  const onUpvote = (nominee: NomineeModel) => nomineeHelper.upvote(nominee);

  const onRemoveNomine = () => {
    const deletedNominee = removableNominee as NomineeModel;
    try {
      nomineeHelper.delete(deletedNominee);
      setRemovedNominee(removableNominee);
      setIsRemoveModalShown(false);
    } finally {
      setIsToastShown(true);
      if (splittedNominees.length === 1 && currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      } else {
        setNomineeFetcher((prev) => prev + 1);
      }
    }
  };

  const dropdownItems: CustomDropdownItemProps[] = [
    {
      text: "MOST POINTS",
      onClick: () => {
        setFilter("descending");
        setCurrentPage(1);
      },
      key: "filter_most_points",
    },
    {
      text: "LESS POINTS",
      onClick: () => {
        setFilter("ascending");
        setCurrentPage(1);
      },
      key: "filter_less_points",
    },
  ];

  useEffect(() => {
    const response = nomineeHelper.get(filter);
    setTotalPages(response.totalPage);
    setNominees(response.data);
  }, [currentPage, filter, nomineeFetcher]);

  return (
    <>
      <Stack gap={5}>
        {/* Manager Button Group */}
        <Row className="manager-buttons-wrapper">
          <CustomButton
            className="manager-button"
            iconProps={{ name: "bi-plus-lg" }}
            text="ADD NOMINEE"
            onClick={() => navigate("/nominee/new")}
          />
          <CustomDropdown
            title="SORT BY"
            className="manager-button"
            variant="secondary"
            iconProps={{ name: "bi-filter" }}
            items={dropdownItems}
          />
        </Row>

        {/* Page Title */}
        <h3 className="nominees-page-title">
          <b>VOTE</b> FOR <b>THE BEST TOURNAMENT</b> STREAMED!
        </h3>

        {/* Nominee Cards */}
        {splittedNominees.length ? (
          <Container className="cards-wrapper">
            {splittedNominees.map((nominee) => (
              <NomineeCard
                {...nominee}
                key={nominee.id}
                onDelete={() => {
                  handleShowRemoveNomineeModal();
                  setRemovableNominee(nominee);
                }}
                onDownvote={() => {
                  onDownvote(nominee);
                  setNomineeFetcher((prev) => prev + 1);
                }}
                onUpvote={() => {
                  onUpvote(nominee);
                  setNomineeFetcher((prev) => prev + 1);
                }}
              />
            ))}
          </Container>
        ) : (
          <h5 className="nominees-page-title">
            There is no nominees to display!
          </h5>
        )}

        {/* Pagination */}
        {!!splittedNominees.length && (
          <CustomPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagesCount={totalPages}
          />
        )}
      </Stack>
      <CustomModal
        confirmation
        isShown={isRemoveModalShown}
        onHide={handleShowRemoveNomineeModal}
        onConfirm={onRemoveNomine}
        title={"Remove Nominee"}
        description={
          <>
            Do you want to remove <b>{removableNominee?.tournamentName}</b> from
            nominees?
          </>
        }
      />
      <CustomToast
        autohide
        onClose={() => setIsToastShown(false)}
        show={isToastShown}
        text={
          <>
            <b>{removedNominee?.tournamentName}</b> removed from nominees!
          </>
        }
      />
    </>
  );
};
