module.exports = {
	$schema: 'http://json.schemastore.org/prettierr',
	printWidth: 100,
	useTabs: true,
	tabWidth: 4,
	semi: true, // 使用分号, 默认true
	endOfLine: 'auto', // 结尾是 \n \r \n\r auto
	singleQuote: true, // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
	trailingComma: 'all', // 行尾逗号,默认none,可选 none|es5|all es5 包括es5中的数组、对象all 包括函数对象等所有可选
	bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
};
