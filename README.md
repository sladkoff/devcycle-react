# devcycle-react

> An alternative devcycle react component library with silent fallback behaviour.

[![NPM](https://img.shields.io/npm/v/devcycle-react.svg)](https://www.npmjs.com/package/devcycle-react)

## Motivation

The original [`@devcycle/devcycle-react-sdk`](https://github.com/DevCycleHQ/js-sdks) has questionable error handling.
It throws errors from inside React hooks which are hard to handle (e.g. when used with Storybook with no real devcycle environment key).

## Install

```bash
npm install --save devcycle-react
```

## Usage

### Feature Components

The following example demonstrates the two main components (`DevcycleContextProvider`, `Feature`) provided by this
library.

```tsx
import React from 'react'

import {DevcycleContextProvider, Feature} from 'devcycle-react'

const App = () => {
	return (
		<DevcycleContextProvider config={{envKey: 'your-env-key'}}>
			<Feature id={'flag_1'} defaultValue={false} enabledOnValue={true}>
				'flag_1' is enabled
			</Feature>

			<Feature id={'some_feature'} defaultValue={false} enabledOnValue={false}>
				'flag_1' is disabled
			</Feature>
		</DevcycleContextProvider>
	)
}
```

### useFeatureFlag()

The custom hook `useFeatureFlag` can be used anywhere within the `DevcycleContext`
to access feature flags imperatively.

```tsx
import React from 'react'

import {useFeatureFlag} from 'devcycle-react'

const MyComponent = () => {
	const {value, isError, isLoading} = useFeatureFlag<boolean>('flag_2', false)

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return <p>Failed to determine feature state...</p>
	}

	if (value === true) {
		return <p>Feature 'flag_2' is enabled</p>
	} else {
		return <p>Feature 'flag_2' is disabled</p>
	}
}
```

### Identifying users

The custom hook `useDevcycle` can be used anywhere within the `DevcycleContext`
to access the Devcycle client.

```tsx
import React, {useEffect} from 'react'

import {useDevcycle} from 'devcycle-react'

const MyComponent = () => {
	const {user} = useUserProfile()
	const {client, isError, isLoading} = useDevcycle()

	useEffect(() => {
		if (isError || isLoading || client === undefined || user === undefined) {
			return
		}

		client.identifyUser({
			name: user.name,
			email: user.email,
			user_id: user.id.toString(),
			isAnonymous: false,
		})
	}, [user, client, isError, isLoading])

	return <></>
}
```

## License

MIT © [sladkoff](https://github.com/sladkoff)
