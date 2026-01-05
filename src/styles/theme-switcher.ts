const colorSchemeMediaQuery = matchMedia("(prefers-color-scheme: dark)");

const applyColorSchemeClassname = () => {
	document.documentElement.classList.toggle(
		"dark",
		colorSchemeMediaQuery.matches,
	);
	document.documentElement.classList.toggle(
		"light",
		!colorSchemeMediaQuery.matches,
	);
};

applyColorSchemeClassname();

colorSchemeMediaQuery.addEventListener("change", applyColorSchemeClassname);