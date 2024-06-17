import moment from 'moment';
import { useState } from 'react';
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { FaRegSave, FaUndo } from 'react-icons/fa';
import { RiStickyNoteAddFill } from 'react-icons/ri';

interface EducationalExperienceData {
	schoolName: string;
	titleOfStudy: string;
	graduationDate: string;
}

interface EducationalExperienceProps {
	isForAdding?: Boolean;
	data: EducationalExperienceData | null;
	saveEducationalExperience: (data: EducationalExperienceData) => void;
	cancelAdding?: () => void;
}

const EducationalExperience: React.FC<EducationalExperienceProps> = ({
	saveEducationalExperience,
	cancelAdding,
	data = null,
	isForAdding= false
}) => {
	const [isEditing, setIsEditing] = useState<Boolean>(data === null);
	const [newSchoolName, setNewSchoolName] = useState<string>(data? data.schoolName : '');
	const [newTitleOfStudy, setNewTitleOfStudy] = useState<string>(data? data.titleOfStudy : '');

	const [newGraduationDate, setNewGraduationdate] =
		useState<string>(data? data.graduationDate: moment(new Date()).format('YYYY/MM/DD'));

	const handleNewSchoolNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setNewSchoolName(e.target.value);
	};

	const handleNewTitleOfStudyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setNewTitleOfStudy(e.target.value);
	};

	const handleSaveButtonClick = (): void => {
		saveEducationalExperience({
			graduationDate: newGraduationDate,
			schoolName: newSchoolName,
			titleOfStudy: newTitleOfStudy});

		if(isForAdding){
			cancelAdding!();
		}
	}

	const handleCancelButtonClick = (): void => {
		if(isForAdding) {
			cancelAdding!();
			setIsEditing(true);
		}

		if(!isForAdding) {
			setIsEditing(false);
		}
	}

	const saveEnabled = newSchoolName && newTitleOfStudy && newGraduationDate;
	return (
		<>
			{!isEditing && !isForAdding &&
				<>
					<Row>
						<Col>
							<h4>{newSchoolName}</h4>
						</Col>
					</Row>

					<Row>
						<Col>
							<h5>{newTitleOfStudy}</h5>
						</Col>
					</Row>

					<Row style={{paddingBottom: '1em'}}>
						<Col>
							Graduation date: {moment(newGraduationDate).format('YYYY/MM/DD')}
						</Col>
					</Row>
				</>
			}

			{isEditing &&
				<>
					<Row style={{paddingBottom: '1em'}}>
						<Form.Group as={Col} controlId="schoolName">
							<Form.Label>Institution Name</Form.Label>

							<Form.Control
								type="text"
								value={newSchoolName}
								placeholder="Enter School's Name"
								onChange={handleNewSchoolNameChange}
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="titleOfStudy">
							<Form.Label>Title of Study</Form.Label>

							<Form.Control
								type="text"
								value={newTitleOfStudy}
								placeholder="Enter your Major/Program of Study"
								onChange={handleNewTitleOfStudyChange}
							/>
						</Form.Group>
					</Row>

					<Row style={{paddingBottom: '1em'}}>
						<Form.Group as={Col} controlId="GraduationDate">
							<Form.Label>Graduation Date</Form.Label>
							<br />
							<DatePicker
								value={moment(newGraduationDate).format('YYYY/MM/DD')}
								showIcon
								toggleCalendarOnIconClick
								dateFormat="yyyy/MM/dd"
								showYearDropdown
								selected={moment(newGraduationDate).toDate()}
								onChange={(date) => {setNewGraduationdate(moment(date).format('YYYY/MM/DD'));}}
							/>
						</Form.Group>
					</Row>

					<Row style={{paddingBottom: '1em'}}>
						<Form.Group as={Col} controlId="saveEducationExperience">
							<OverlayTrigger
								placement="top"
								overlay={
									<Tooltip id="saveButtonToolTip">
										Save Education Experience
									</Tooltip>
								}
							>
								<span>
									<Button className="btn-sm" onClick={handleSaveButtonClick} disabled={!saveEnabled}>
										<FaRegSave />
									</Button>
								</span>
							</OverlayTrigger>&nbsp;

							<OverlayTrigger
								placement="bottom"
								overlay={
									<Tooltip id="undoButtonToolTip">
										Undo your changes
									</Tooltip>
								}
							>
								<span>
									<Button className="btn-sm" variant="secondary" onClick={handleCancelButtonClick}>
										<FaUndo />
									</Button>
								</span>
							</OverlayTrigger>
						</Form.Group>
					</Row>
				</>
			}
		</>
	);
};

const EducationalExperienceList: React.FC = () => {
	const [educationalExperienceItems, setEducationalExperienceItems] = useState<EducationalExperienceData[]>([]);
	const [isAdding, setIsAdding] = useState<Boolean>(false);
	const handleAddEducationalExperienceClick = () => {setIsAdding(true)};

	const addEducationalExperience = (data: EducationalExperienceData): void => {
		setEducationalExperienceItems((prev) => ([...prev, data]));
	};

	const saveEducationalExperience = (data: EducationalExperienceData): void => {console.log(JSON.stringify(data))};

	return(
	<>
		<Row style={{paddingBottom: '1em'}}>
			<Col>
				<h3>Educational Experience</h3>
			</Col>

			<Col style={{textAlign: 'right'}}>
				<OverlayTrigger
					placement="top"
					overlay={
						<Tooltip id="addEducationalExperienceToolTip">Add Educational Experience</Tooltip>
					}
				>
					<Button variant="primary" className="btn-sm" onClick={handleAddEducationalExperienceClick}>
						<RiStickyNoteAddFill />
					</Button>
				</OverlayTrigger>&nbsp;
			</Col>
		</Row>

		{isAdding &&
			<EducationalExperience
				data={null}
				saveEducationalExperience={addEducationalExperience}
				isForAdding
				cancelAdding={() => setIsAdding(false)}
			/>
		}

		{
			educationalExperienceItems.length? educationalExperienceItems.map(
				(ee) => (
				<>
					<EducationalExperience data={ee} saveEducationalExperience={saveEducationalExperience}/>
				</>
				)) :
			'No Educational Experience On File'
		}
	</>);
}

export default EducationalExperienceList;