import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/core';
import { 
    Explore, KeyboardArrowDown, Person, StarBorder, Code,
    SportsEsports, BugReport, Spa, Brush, EmojiEvents
} from '@material-ui/icons';

export default function SectionBG() {

    const actions = [
        {
            key: 0,
            icon: <Person />,
            name: 'About me',
        },
        {
            key: 1,
            icon: <StarBorder />,
            name: 'Featured items',
        },
        {
            key: 2,
            icon: <Code />,
            name: 'Computer science',
        },
        {
            key: 3,
            icon: <SportsEsports />,
            name: 'Video game development',
        },
        {
            key: 4,
            icon: <Spa />,
            name: 'Plant cultivating & sales',
        },
        {
            key: 5,
            icon: <BugReport />,
            name: 'Animal breeding & sales',
        },
        {
            key: 6,
            icon: <Brush />,
            name: 'Art gallery',
        },
        {
            key: 7,
            icon: <EmojiEvents />,
            name: 'Lichen of the year',
        },
    ];

    return (
        <SpeedDial
            ariaLabel="SpeedDial basic example"
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