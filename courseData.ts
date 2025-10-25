export interface Lesson {
  titleKey: string;
  link: string;
}

export interface Unit {
  key: string;
  titleKey: string;
  subtitleKey: string;
  contentTitleKey: string;
  path: string;
  lessons: Lesson[];
}

export const courseData: Unit[] = [
  {
    key: 'unit1',
    titleKey: 'unit1.title',
    subtitleKey: 'unit1.subtitle',
    contentTitleKey: 'unit1.content.title',
    path: '/unit-1',
    lessons: [
      { titleKey: 'unit1.lesson1.title', link: 'https://drive.google.com/file/d/1h5H3caZUid8_Of0f6DOQ465-5cXLXvAd/view?usp=drive_link' },
      { titleKey: 'unit1.lesson2.title', link: 'https://drive.google.com/file/d/1xGccpVgSq3tFqaRW00WcQVFiMRDnNXRi/view?usp=drive_link' },
      { titleKey: 'unit1.lesson3.title', link: 'https://drive.google.com/file/d/1v2BxkZVY4lXmkgx0fxVUl5rbeMvRhPxk/view?usp=drive_link' },
      { titleKey: 'unit1.lesson4.title', link: 'https://drive.google.com/file/d/1wYdItMr1cCTCZKqMFfEFLa3s_Z_zoX1k/view?usp=drive_link' },
    ],
  },
  {
    key: 'unit2',
    titleKey: 'unit2.title',
    subtitleKey: 'unit2.subtitle',
    contentTitleKey: 'unit2.content.title',
    path: '/unit-2',
    lessons: [
      { titleKey: 'unit2.lesson1.title', link: 'https://drive.google.com/file/d/1-si3uGyHqCMyxsX4XYbYw1BknI1CztqQ/view?usp=drive_link' },
      { titleKey: 'unit2.lesson2.title', link: 'https://drive.google.com/file/d/1soC6BVoZV2Wiu-EEzGzMewkPCYTrAmmf/view?usp=drive_link' },
    ],
  },
  {
    key: 'unit3',
    titleKey: 'unit3.title',
    subtitleKey: 'unit3.subtitle',
    contentTitleKey: 'unit3.content.title',
    path: '/unit-3',
    lessons: [
      { titleKey: 'unit3.lesson1.title', link: 'https://drive.google.com/file/d/1fbTymUhoeaxhzlXOzACse51BlM4Dgln9/view?usp=drive_link' },
      { titleKey: 'unit3.lesson2.title', link: 'https://docs.google.com/presentation/d/1J_F9q5zHy_0laSYnybL0AfcXagLHRJFU/edit?usp=drive_link&ouid=111645403011017077715&rtpof=true&sd=true' },
    ],
  },
    {
    key: 'unit4',
    titleKey: 'unit4.title',
    subtitleKey: 'unit4.subtitle',
    contentTitleKey: 'unit4.content.title',
    path: '/unit-4',
    lessons: [
        { titleKey: 'unit4.lesson1.title', link: 'https://drive.google.com/file/d/1ywDrqso1KmNRP3vAuUiEkbJpAQj8EuX4/view?usp=drive_link' },
        { titleKey: 'unit4.lesson2.title', link: 'https://drive.google.com/file/d/1eVF6WjKvT_vWjBTviT8xLrBX7YoGJ8CY/view?usp=drive_link' },
        { titleKey: 'unit4.lesson3.title', link: 'https://docs.google.com/presentation/d/1OHBHZYuYFJbIDTtPebTzbrZOGVswOSS1/edit?usp=drive_link&ouid=111645403011017077715&rtpof=true&sd=true' },
        { titleKey: 'unit4.lesson4.title', link: 'https://drive.google.com/file/d/1a_FtQcw6-OujTPiYWgwLYgDjYRllUJNW/view?usp=drive_link' },
    ],
  },
  {
    key: 'unit5',
    titleKey: 'unit5.title',
    subtitleKey: 'unit5.subtitle',
    contentTitleKey: 'unit5.content.title',
    path: '/unit-5',
    lessons: [
      { titleKey: 'unit5.lesson1.title', link: 'https://drive.google.com/file/d/1FePRff4Xt6Mz2DWwvgy-JrWlNiejhOmz/view?usp=drive_link' },
      { titleKey: 'unit5.lesson2.title', link: 'https://drive.google.com/file/d/11hk_ij385nUVkymSDPHyn5yQ3nLHR95e/view?usp=drive_link' },
      { titleKey: 'unit5.lesson3.title', link: 'https://drive.google.com/file/d/1X-qctNr2er3XKeHr04VPCzbxEHeENzKH/view?usp=drive_link' },
      { titleKey: 'unit5.lesson4.title', link: 'https://drive.google.com/file/d/10jqqHssi7dHmIhyesaqPwWrt3CZ-lCs-/view?usp=drive_link' },
    ],
  },
  {
    key: 'unit6',
    titleKey: 'unit6.title',
    subtitleKey: 'unit6.subtitle',
    contentTitleKey: 'unit6.content.title',
    path: '/unit-6',
    lessons: [
      { titleKey: 'unit6.lesson1.title', link: 'https://drive.google.com/file/d/1L00faWdbi19WZAlYcbi3SXxnyKeNQvGO/view?usp=drive_link' },
      { titleKey: 'unit6.lesson2.title', link: 'https://drive.google.com/file/d/173piIGAHK-7Ud43ZhxLBtlX9LgO2epiE/view?usp=drive_link' },
    ],
  },
  {
    key: 'unit7',
    titleKey: 'unit7.title',
    subtitleKey: 'unit7.subtitle',
    contentTitleKey: 'unit7.content.title',
    path: '/unit-7',
    lessons: [
      { titleKey: 'unit7.lesson1.title', link: 'https://drive.google.com/file/d/17KWUUypw8qSLfUt__zuPvwO68kJieSzI/view?usp=drive_link' },
      { titleKey: 'unit7.lesson2.title', link: 'https://docs.google.com/presentation/d/1IDIA5SuMd51vcm1p-Tx57YBX7f092ueN/edit?usp=drive_link&ouid=111645403011017077715&rtpof=true&sd=true' },
      { titleKey: 'unit7.lesson3.title', link: 'https://drive.google.com/file/d/1xTG0etp5LfQXXJ39LChOh52wSvnNMAhg/view?usp=drive_link' },
      { titleKey: 'unit7.lesson4.title', link: 'https://drive.google.com/file/d/1tZb2VWdXJYZ8O7Dg_TsHb9JzWZlbOPIo/view?usp=sharing' },
      { titleKey: 'unit7.lesson5.title', link: 'https://drive.google.com/file/d/a9o-OvZhaJ2HTrbSQOnj--D2nlBstXIE/view?usp=drive_link' },
    ],
  }
];
