import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/core';
import { 
    Explore, KeyboardArrowDown, Person, StarBorder, Code,
    SportsEsports, BugReport, Spa, Brush, EmojiEvents
} from '@material-ui/icons';

export default function SectionBG() {

    const lang = localStorage.getItem('lang');

    const actions = [
        {
            key: 0,
            icon: <Person />,
            name: lang === 'kor' ? '소개' : 'About Me',
        },
        {
            key: 1,
            icon: <StarBorder />,
            name: lang === 'kor' ? '게시판' : 'Featured Items',
        },
        {
            key: 2,
            icon: <Code />,
            name: lang === 'kor' ? '컴퓨터공학' : 'Computer Science',
        },
        {
            key: 3,
            icon: <SportsEsports />,
            name: lang === 'kor' ? '게임 개발' : 'Video Game Development',
        },
        {
            key: 4,
            icon: <Spa />,
            name: lang === 'kor' ? '식물 / 화훼 / 테라리움' : 'Plants and Terrariums',
        },
        {
            key: 5,
            icon: <BugReport />,
            name: lang === 'kor' ? '동물류 사육 / 키우기 / 분양' : 'Animal Keeping and Sales',
        },
        {
            key: 6,
            icon: <Brush />,
            name: lang === 'kor' ? '그림 / 예술작품' : 'Art gallery',
        },
        {
            key: 7,
            icon: <EmojiEvents />,
            name: lang === 'kor' ? '금년의 지의류' : 'Lichen of the year',
        },
    ];

    return (
        <SpeedDial
            ariaLabel="Navigator"
            sx={{ position: 'fixed', top: 24, left: 24 }}
            icon={<SpeedDialIcon icon={<Explore />} openIcon={<KeyboardArrowDown />} />}
            direction={'down'}>

            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => {
                        window.location.href = '/main-page/?p=' + (action.key + 1) + '&b=true';
                    }}
                />
            ))}
        </SpeedDial>
    );
}