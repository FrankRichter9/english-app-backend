const data = {
	head: {},
	def: [
		{
			text: 'test',
			pos: 'noun',
			ts: 'test',
			tr: [
				{
					text: 'тест',
					pos: 'noun',
					gen: 'м',
					fr: 10,
					syn: [
						{
							text: 'испытание',
							pos: 'noun',
							gen: 'ср',
							fr: 10,
						},
						{
							text: 'проверка',
							pos: 'noun',
							gen: 'ж',
							fr: 5,
						},
						{
							text: 'проба',
							pos: 'noun',
							gen: 'ж',
							fr: 1,
						},
						{
							text: 'тестирование',
							pos: 'noun',
							gen: 'ср',
							fr: 5,
						},
						{
							text: 'экзамен',
							pos: 'noun',
							gen: 'м',
							fr: 1,
						},
					],
					mean: [
						{
							text: 'benchmark',
						},
						{
							text: 'testing',
						},
						{
							text: 'check',
						},
						{
							text: 'exam',
						},
					],
				},
				{
					text: 'анализ',
					pos: 'noun',
					gen: 'м',
					fr: 5,
					mean: [
						{
							text: 'analysis',
						},
					],
				},
				{
					text: 'обследование',
					pos: 'noun',
					gen: 'ср',
					fr: 1,
					mean: [
						{
							text: 'examination',
						},
					],
				},
			],
		},
		{
			text: 'test',
			pos: 'verb',
			ts: 'test',
			tr: [
				{
					text: 'тестировать',
					pos: 'verb',
					asp: 'несов',
					fr: 5,
					syn: [
						{
							text: 'проверять',
							pos: 'verb',
							asp: 'несов',
							fr: 5,
						},
						{
							text: 'протестировать',
							pos: 'verb',
							asp: 'сов',
							fr: 5,
						},
						{
							text: 'проверить',
							pos: 'verb',
							asp: 'сов',
							fr: 5,
						},
						{
							text: 'опробовать',
							pos: 'verb',
							fr: 1,
						},
						{
							text: 'апробировать',
							pos: 'verb',
							fr: 1,
						},
					],
					mean: [
						{
							text: 'probe',
						},
						{
							text: 'check',
						},
						{
							text: 'try',
						},
						{
							text: 'approve',
						},
					],
				},
				{
					text: 'испытывать',
					pos: 'verb',
					asp: 'несов',
					fr: 5,
					syn: [
						{
							text: 'испытать',
							pos: 'verb',
							asp: 'сов',
							fr: 5,
						},
					],
					mean: [
						{
							text: 'experience',
						},
					],
				},
			],
		},
		{
			text: 'test',
			pos: 'adjective',
			ts: 'test',
			tr: [
				{
					text: 'испытательный',
					pos: 'adjective',
					fr: 5,
					syn: [
						{
							text: 'пробный',
							pos: 'adjective',
							fr: 1,
						},
						{
							text: 'контрольный',
							pos: 'adjective',
							fr: 5,
						},
						{
							text: 'тестовый',
							pos: 'adjective',
							fr: 5,
						},
					],
					mean: [
						{
							text: 'testing',
						},
						{
							text: 'trial',
						},
						{
							text: 'check',
						},
					],
				},
				{
					text: 'опытный',
					pos: 'adjective',
					fr: 1,
					mean: [
						{
							text: 'experimental',
						},
					],
				},
			],
		},
	],
}

export function transformData(data: any) {
	const translates = data?.def
	const translate = translates?.[0]?.tr?.[0]?.text

	// translates?.reduce((acc, item) => {})

	return {
		translate,
		synonyms: {
			ru: [],
			en: [],
		},
	}
}
