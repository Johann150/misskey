<template>
<div class="_formRoot">
	<FormSelect v-model="statusbar.type" placeholder="Please select" class="_formBlock">
		<template #label>{{ i18n.ts.type }}</template>
		<option value="rss">RSS</option>
		<option value="federation">Federation</option>
		<option value="userList">User list timeline</option>
	</FormSelect>

	<MkInput v-model="statusbar.name" manual-save class="_formBlock">
		<template #label>Name</template>
	</MkInput>

	<MkSwitch v-model="statusbar.black" class="_formBlock">
		<template #label>Black</template>
	</MkSwitch>

	<FormRadios v-model="statusbar.size" class="_formBlock">
		<template #label>Size</template>
		<option value="verySmall">{{ i18n.ts.small }}+</option>
		<option value="small">{{ i18n.ts.small }}</option>
		<option value="medium">{{ i18n.ts.medium }}</option>
		<option value="large">{{ i18n.ts.large }}</option>
		<option value="veryLarge">{{ i18n.ts.large }}+</option>
	</FormRadios>

	<template v-if="statusbar.type === 'rss'">
		<MkInput v-model="statusbar.props.url" manual-save class="_formBlock" type="url">
			<template #label>URL</template>
		</MkInput>
		<MkInput v-model="statusbar.props.refreshIntervalSec" manual-save class="_formBlock" type="number">
			<template #label>Refresh interval</template>
		</MkInput>
		<MkInput v-model="statusbar.props.marqueeDuration" manual-save class="_formBlock" type="number">
			<template #label>Duration</template>
		</MkInput>
		<MkSwitch v-model="statusbar.props.marqueeReverse" class="_formBlock">
			<template #label>Reverse</template>
		</MkSwitch>
	</template>
	<template v-else-if="statusbar.type === 'federation'">
		<MkInput v-model="statusbar.props.refreshIntervalSec" manual-save class="_formBlock" type="number">
			<template #label>Refresh interval</template>
		</MkInput>
		<MkInput v-model="statusbar.props.marqueeDuration" manual-save class="_formBlock" type="number">
			<template #label>Duration</template>
		</MkInput>
		<MkSwitch v-model="statusbar.props.marqueeReverse" class="_formBlock">
			<template #label>Reverse</template>
		</MkSwitch>
		<MkSwitch v-model="statusbar.props.colored" class="_formBlock">
			<template #label>Colored</template>
		</MkSwitch>
	</template>
	<template v-else-if="statusbar.type === 'userList' && userLists != null">
		<FormSelect v-model="statusbar.props.userListId" class="_formBlock">
			<template #label>{{ i18n.ts.userList }}</template>
			<option v-for="list in userLists" :value="list.id">{{ list.name }}</option>
		</FormSelect>
		<MkInput v-model="statusbar.props.refreshIntervalSec" manual-save class="_formBlock" type="number">
			<template #label>Refresh interval</template>
		</MkInput>
		<MkInput v-model="statusbar.props.marqueeDuration" manual-save class="_formBlock" type="number">
			<template #label>Duration</template>
		</MkInput>
		<MkSwitch v-model="statusbar.props.marqueeReverse" class="_formBlock">
			<template #label>Reverse</template>
		</MkSwitch>
	</template>

	<div style="display: flex; gap: var(--margin); flex-wrap: wrap;">
		<FormButton danger @click="del">Delete</FormButton>
	</div>
</div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
import FormSelect from '@/components/form/select.vue';
import MkInput from '@/components/form/input.vue';
import MkSwitch from '@/components/form/switch.vue';
import FormRadios from '@/components/form/radios.vue';
import FormButton from '@/components/ui/button.vue';
import * as os from '@/os';
import { menuDef } from '@/menu';
import { defaultStore } from '@/store';
import { i18n } from '@/i18n';

const props = defineProps<{
	_id: string;
	userLists: any[] | null;
}>();

const statusbar = reactive(JSON.parse(JSON.stringify(defaultStore.state.statusbars.find(x => x.id === props._id))));

watch(() => statusbar.type, () => {
	if (statusbar.type === 'rss') {
		statusbar.name = 'NEWS';
		statusbar.props.url = 'http://feeds.afpbb.com/rss/afpbb/afpbbnews';
		statusbar.props.refreshIntervalSec = 120;
		statusbar.props.display = 'marquee';
		statusbar.props.marqueeDuration = 100;
		statusbar.props.marqueeReverse = false;
	} else if (statusbar.type === 'federation') {
		statusbar.name = 'FEDERATION';
		statusbar.props.refreshIntervalSec = 120;
		statusbar.props.display = 'marquee';
		statusbar.props.marqueeDuration = 100;
		statusbar.props.marqueeReverse = false;
		statusbar.props.colored = false;
	} else if (statusbar.type === 'userList') {
		statusbar.name = 'LIST TL';
		statusbar.props.refreshIntervalSec = 120;
		statusbar.props.display = 'marquee';
		statusbar.props.marqueeDuration = 100;
		statusbar.props.marqueeReverse = false;
	}
});

watch(statusbar, save);

async function save() {
	const i = defaultStore.state.statusbars.findIndex(x => x.id === props._id);
	const statusbars = JSON.parse(JSON.stringify(defaultStore.state.statusbars));
	statusbars[i] = JSON.parse(JSON.stringify(statusbar));
	defaultStore.set('statusbars', statusbars);
}

function del() {
	defaultStore.set('statusbars', defaultStore.state.statusbars.filter(x => x.id !== props._id));
}
</script>
