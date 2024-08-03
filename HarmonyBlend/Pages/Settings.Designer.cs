namespace HarmonyBlend.Pages
{
	partial class Settings
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing) {
			if(disposing && (components != null)) {
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Windows Form Designer generated code

		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent() {
			DataGridViewCellStyle dataGridViewCellStyle1 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle2 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle3 = new DataGridViewCellStyle();
			groupBox1 = new GroupBox();
			tableLayoutPanel1 = new TableLayoutPanel();
			groupBox3 = new GroupBox();
			groupBox4 = new GroupBox();
			activePassive_radioButton = new RadioButton();
			allProducts_radioButton = new RadioButton();
			label13 = new Label();
			productName_filter_textBox = new TextBox();
			refreshData_byFilters_button = new Button();
			productCodeEnd_maskedTextBox = new MaskedTextBox();
			label10 = new Label();
			label12 = new Label();
			productCodeBegin_maskedTextBox = new MaskedTextBox();
			label11 = new Label();
			label9 = new Label();
			category_comboBox = new ComboBox();
			activePassive_comboBox = new ComboBox();
			label8 = new Label();
			groupBox2 = new GroupBox();
			changePCode_checkBox = new CheckBox();
			label14 = new Label();
			category_AllProducts_comboBox = new ComboBox();
			productCode_maskedTextBox = new MaskedTextBox();
			label2 = new Label();
			label3 = new Label();
			label4 = new Label();
			label15 = new Label();
			label5 = new Label();
			deleteActivate_checkBox = new CheckBox();
			label6 = new Label();
			productName_textBox = new TextBox();
			saveChanges_button = new Button();
			desc_textBox = new TextBox();
			productPrice_textbox = new TextBox();
			addProduct_button = new Button();
			productUnit_comboBox = new ComboBox();
			deleteProduct_button = new Button();
			activePassive_AllProducts_comboBox = new ComboBox();
			allProducts_dataGridView = new DataGridView();
			activeProducts_dataGridView = new DataGridView();
			label7 = new Label();
			label1 = new Label();
			connectionTestDB_button = new Button();
			groupBox1.SuspendLayout();
			tableLayoutPanel1.SuspendLayout();
			groupBox3.SuspendLayout();
			groupBox4.SuspendLayout();
			groupBox2.SuspendLayout();
			((System.ComponentModel.ISupportInitialize)allProducts_dataGridView).BeginInit();
			((System.ComponentModel.ISupportInitialize)activeProducts_dataGridView).BeginInit();
			SuspendLayout();
			// 
			// groupBox1
			// 
			groupBox1.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
			groupBox1.Controls.Add(tableLayoutPanel1);
			groupBox1.ForeColor = SystemColors.Control;
			groupBox1.Location = new Point(12, 49);
			groupBox1.Name = "groupBox1";
			groupBox1.Size = new Size(1156, 789);
			groupBox1.TabIndex = 0;
			groupBox1.TabStop = false;
			groupBox1.Text = "Stock";
			// 
			// tableLayoutPanel1
			// 
			tableLayoutPanel1.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
			tableLayoutPanel1.ColumnCount = 2;
			tableLayoutPanel1.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 50F));
			tableLayoutPanel1.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 50F));
			tableLayoutPanel1.Controls.Add(groupBox3, 1, 2);
			tableLayoutPanel1.Controls.Add(label8, 1, 0);
			tableLayoutPanel1.Controls.Add(groupBox2, 0, 2);
			tableLayoutPanel1.Controls.Add(allProducts_dataGridView, 0, 1);
			tableLayoutPanel1.Controls.Add(activeProducts_dataGridView, 1, 1);
			tableLayoutPanel1.Controls.Add(label7, 0, 0);
			tableLayoutPanel1.Location = new Point(6, 22);
			tableLayoutPanel1.Name = "tableLayoutPanel1";
			tableLayoutPanel1.RowCount = 3;
			tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Absolute, 25F));
			tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Percent, 62.6358681F));
			tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Percent, 37.3641319F));
			tableLayoutPanel1.Size = new Size(1144, 761);
			tableLayoutPanel1.TabIndex = 12;
			// 
			// groupBox3
			// 
			groupBox3.Controls.Add(groupBox4);
			groupBox3.Dock = DockStyle.Fill;
			groupBox3.ForeColor = SystemColors.Control;
			groupBox3.Location = new Point(575, 489);
			groupBox3.Name = "groupBox3";
			groupBox3.Size = new Size(566, 269);
			groupBox3.TabIndex = 16;
			groupBox3.TabStop = false;
			groupBox3.Text = "Filters";
			// 
			// groupBox4
			// 
			groupBox4.Controls.Add(activePassive_radioButton);
			groupBox4.Controls.Add(allProducts_radioButton);
			groupBox4.Controls.Add(label13);
			groupBox4.Controls.Add(productName_filter_textBox);
			groupBox4.Controls.Add(refreshData_byFilters_button);
			groupBox4.Controls.Add(productCodeEnd_maskedTextBox);
			groupBox4.Controls.Add(label10);
			groupBox4.Controls.Add(label12);
			groupBox4.Controls.Add(productCodeBegin_maskedTextBox);
			groupBox4.Controls.Add(label11);
			groupBox4.Controls.Add(label9);
			groupBox4.Controls.Add(category_comboBox);
			groupBox4.Controls.Add(activePassive_comboBox);
			groupBox4.Dock = DockStyle.Fill;
			groupBox4.ForeColor = SystemColors.Control;
			groupBox4.Location = new Point(3, 19);
			groupBox4.Name = "groupBox4";
			groupBox4.Size = new Size(560, 247);
			groupBox4.TabIndex = 15;
			groupBox4.TabStop = false;
			groupBox4.Text = "By Tables";
			// 
			// activePassive_radioButton
			// 
			activePassive_radioButton.AutoSize = true;
			activePassive_radioButton.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			activePassive_radioButton.Location = new Point(278, 31);
			activePassive_radioButton.Name = "activePassive_radioButton";
			activePassive_radioButton.Size = new Size(187, 24);
			activePassive_radioButton.TabIndex = 17;
			activePassive_radioButton.Text = "Aktifler Pasifler Tablosu";
			activePassive_radioButton.UseVisualStyleBackColor = true;
			// 
			// allProducts_radioButton
			// 
			allProducts_radioButton.AutoSize = true;
			allProducts_radioButton.Checked = true;
			allProducts_radioButton.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			allProducts_radioButton.Location = new Point(86, 31);
			allProducts_radioButton.Name = "allProducts_radioButton";
			allProducts_radioButton.Size = new Size(169, 24);
			allProducts_radioButton.TabIndex = 17;
			allProducts_radioButton.TabStop = true;
			allProducts_radioButton.Text = "Tüm Ürünler Tablosu";
			allProducts_radioButton.UseVisualStyleBackColor = true;
			// 
			// label13
			// 
			label13.AutoSize = true;
			label13.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label13.ForeColor = Color.White;
			label13.Location = new Point(291, 74);
			label13.Name = "label13";
			label13.Size = new Size(75, 20);
			label13.TabIndex = 15;
			label13.Text = "Ürün Adı:";
			// 
			// productName_filter_textBox
			// 
			productName_filter_textBox.Location = new Point(372, 73);
			productName_filter_textBox.Name = "productName_filter_textBox";
			productName_filter_textBox.Size = new Size(158, 23);
			productName_filter_textBox.TabIndex = 16;
			// 
			// refreshData_byFilters_button
			// 
			refreshData_byFilters_button.Font = new Font("Segoe UI", 12F);
			refreshData_byFilters_button.ForeColor = Color.FromArgb(39, 47, 59);
			refreshData_byFilters_button.Location = new Point(372, 128);
			refreshData_byFilters_button.Name = "refreshData_byFilters_button";
			refreshData_byFilters_button.Size = new Size(158, 33);
			refreshData_byFilters_button.TabIndex = 14;
			refreshData_byFilters_button.Text = "Verileri Yenile";
			refreshData_byFilters_button.UseVisualStyleBackColor = true;
			refreshData_byFilters_button.Click += refreshData_AllProducts_button_Click;
			// 
			// productCodeEnd_maskedTextBox
			// 
			productCodeEnd_maskedTextBox.Location = new Point(114, 99);
			productCodeEnd_maskedTextBox.Mask = "000.00.000";
			productCodeEnd_maskedTextBox.Name = "productCodeEnd_maskedTextBox";
			productCodeEnd_maskedTextBox.Size = new Size(158, 23);
			productCodeEnd_maskedTextBox.TabIndex = 13;
			// 
			// label10
			// 
			label10.AutoSize = true;
			label10.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label10.ForeColor = Color.White;
			label10.Location = new Point(18, 129);
			label10.Name = "label10";
			label10.Size = new Size(92, 20);
			label10.TabIndex = 12;
			label10.Text = "Aktif / Pasif:";
			// 
			// label12
			// 
			label12.AutoSize = true;
			label12.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label12.ForeColor = Color.White;
			label12.Location = new Point(67, 100);
			label12.Name = "label12";
			label12.Size = new Size(41, 20);
			label12.TabIndex = 12;
			label12.Text = "Bitiş:";
			// 
			// productCodeBegin_maskedTextBox
			// 
			productCodeBegin_maskedTextBox.Location = new Point(114, 73);
			productCodeBegin_maskedTextBox.Mask = "000.00.000";
			productCodeBegin_maskedTextBox.Name = "productCodeBegin_maskedTextBox";
			productCodeBegin_maskedTextBox.Size = new Size(158, 23);
			productCodeBegin_maskedTextBox.TabIndex = 13;
			// 
			// label11
			// 
			label11.AutoSize = true;
			label11.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label11.ForeColor = Color.White;
			label11.Location = new Point(33, 74);
			label11.Name = "label11";
			label11.Size = new Size(77, 20);
			label11.TabIndex = 12;
			label11.Text = "Başlangıç:";
			// 
			// label9
			// 
			label9.AutoSize = true;
			label9.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label9.ForeColor = Color.White;
			label9.Location = new Point(276, 100);
			label9.Name = "label9";
			label9.Size = new Size(90, 20);
			label9.TabIndex = 7;
			label9.Text = "Kategoriler:";
			// 
			// category_comboBox
			// 
			category_comboBox.AutoCompleteMode = AutoCompleteMode.SuggestAppend;
			category_comboBox.AutoCompleteSource = AutoCompleteSource.ListItems;
			category_comboBox.DropDownStyle = ComboBoxStyle.DropDownList;
			category_comboBox.FormattingEnabled = true;
			category_comboBox.Location = new Point(372, 99);
			category_comboBox.Name = "category_comboBox";
			category_comboBox.Size = new Size(158, 23);
			category_comboBox.TabIndex = 8;
			// 
			// activePassive_comboBox
			// 
			activePassive_comboBox.AutoCompleteMode = AutoCompleteMode.SuggestAppend;
			activePassive_comboBox.AutoCompleteSource = AutoCompleteSource.ListItems;
			activePassive_comboBox.DropDownStyle = ComboBoxStyle.DropDownList;
			activePassive_comboBox.FormattingEnabled = true;
			activePassive_comboBox.ItemHeight = 15;
			activePassive_comboBox.Items.AddRange(new object[] { "Aktif", "Pasif" });
			activePassive_comboBox.Location = new Point(114, 128);
			activePassive_comboBox.Name = "activePassive_comboBox";
			activePassive_comboBox.Size = new Size(88, 23);
			activePassive_comboBox.TabIndex = 6;
			// 
			// label8
			// 
			label8.AutoSize = true;
			label8.Font = new Font("Segoe UI Semibold", 13.75F, FontStyle.Bold);
			label8.Location = new Point(575, 0);
			label8.Name = "label8";
			label8.Size = new Size(161, 25);
			label8.TabIndex = 15;
			label8.Text = "Actives / Passives";
			// 
			// groupBox2
			// 
			groupBox2.Controls.Add(changePCode_checkBox);
			groupBox2.Controls.Add(label14);
			groupBox2.Controls.Add(category_AllProducts_comboBox);
			groupBox2.Controls.Add(productCode_maskedTextBox);
			groupBox2.Controls.Add(label2);
			groupBox2.Controls.Add(label3);
			groupBox2.Controls.Add(label4);
			groupBox2.Controls.Add(label15);
			groupBox2.Controls.Add(label5);
			groupBox2.Controls.Add(deleteActivate_checkBox);
			groupBox2.Controls.Add(label6);
			groupBox2.Controls.Add(productName_textBox);
			groupBox2.Controls.Add(saveChanges_button);
			groupBox2.Controls.Add(desc_textBox);
			groupBox2.Controls.Add(productPrice_textbox);
			groupBox2.Controls.Add(addProduct_button);
			groupBox2.Controls.Add(productUnit_comboBox);
			groupBox2.Controls.Add(deleteProduct_button);
			groupBox2.Controls.Add(activePassive_AllProducts_comboBox);
			groupBox2.Dock = DockStyle.Fill;
			groupBox2.ForeColor = SystemColors.Control;
			groupBox2.Location = new Point(3, 489);
			groupBox2.Name = "groupBox2";
			groupBox2.Size = new Size(566, 269);
			groupBox2.TabIndex = 13;
			groupBox2.TabStop = false;
			groupBox2.Text = "Adjustments";
			// 
			// changePCode_checkBox
			// 
			changePCode_checkBox.AutoSize = true;
			changePCode_checkBox.Location = new Point(99, 14);
			changePCode_checkBox.Name = "changePCode_checkBox";
			changePCode_checkBox.Size = new Size(217, 19);
			changePCode_checkBox.TabIndex = 14;
			changePCode_checkBox.Text = "Ürün kodunu değiştirmek istiyorum.";
			changePCode_checkBox.UseVisualStyleBackColor = true;
			changePCode_checkBox.CheckedChanged += changePCode_checkBox_CheckedChanged;
			// 
			// label14
			// 
			label14.AutoSize = true;
			label14.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label14.ForeColor = Color.White;
			label14.Location = new Point(313, 110);
			label14.Name = "label14";
			label14.Size = new Size(90, 20);
			label14.TabIndex = 12;
			label14.Text = "Kategoriler:";
			// 
			// category_AllProducts_comboBox
			// 
			category_AllProducts_comboBox.AutoCompleteMode = AutoCompleteMode.SuggestAppend;
			category_AllProducts_comboBox.AutoCompleteSource = AutoCompleteSource.ListItems;
			category_AllProducts_comboBox.DropDownStyle = ComboBoxStyle.DropDownList;
			category_AllProducts_comboBox.FormattingEnabled = true;
			category_AllProducts_comboBox.Location = new Point(407, 109);
			category_AllProducts_comboBox.Name = "category_AllProducts_comboBox";
			category_AllProducts_comboBox.Size = new Size(117, 23);
			category_AllProducts_comboBox.TabIndex = 13;
			// 
			// productCode_maskedTextBox
			// 
			productCode_maskedTextBox.Enabled = false;
			productCode_maskedTextBox.Location = new Point(117, 37);
			productCode_maskedTextBox.Mask = "000.00.000";
			productCode_maskedTextBox.Name = "productCode_maskedTextBox";
			productCode_maskedTextBox.Size = new Size(190, 23);
			productCode_maskedTextBox.TabIndex = 11;
			// 
			// label2
			// 
			label2.AutoSize = true;
			label2.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label2.ForeColor = Color.White;
			label2.Location = new Point(23, 36);
			label2.Name = "label2";
			label2.Size = new Size(88, 20);
			label2.TabIndex = 4;
			label2.Text = "Ürün Kodu:";
			// 
			// label3
			// 
			label3.AutoSize = true;
			label3.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label3.ForeColor = Color.White;
			label3.Location = new Point(23, 75);
			label3.Name = "label3";
			label3.Size = new Size(75, 20);
			label3.TabIndex = 4;
			label3.Text = "Ürün Adı:";
			// 
			// label4
			// 
			label4.AutoSize = true;
			label4.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label4.ForeColor = Color.White;
			label4.Location = new Point(313, 39);
			label4.Name = "label4";
			label4.Size = new Size(92, 20);
			label4.TabIndex = 4;
			label4.Text = "Ürün Birimi:";
			// 
			// label15
			// 
			label15.AutoSize = true;
			label15.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label15.ForeColor = Color.White;
			label15.Location = new Point(23, 139);
			label15.Name = "label15";
			label15.Size = new Size(75, 20);
			label15.TabIndex = 4;
			label15.Text = "Açıklama:";
			// 
			// label5
			// 
			label5.AutoSize = true;
			label5.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label5.ForeColor = Color.White;
			label5.Location = new Point(23, 110);
			label5.Name = "label5";
			label5.Size = new Size(85, 20);
			label5.TabIndex = 4;
			label5.Text = "Satış Fiyatı:";
			// 
			// deleteActivate_checkBox
			// 
			deleteActivate_checkBox.AutoSize = true;
			deleteActivate_checkBox.Font = new Font("Segoe UI", 12F);
			deleteActivate_checkBox.Location = new Point(55, 217);
			deleteActivate_checkBox.Name = "deleteActivate_checkBox";
			deleteActivate_checkBox.Size = new Size(194, 25);
			deleteActivate_checkBox.TabIndex = 10;
			deleteActivate_checkBox.Text = "Ürünü Silmek İstiyorum";
			deleteActivate_checkBox.UseVisualStyleBackColor = true;
			deleteActivate_checkBox.CheckedChanged += deleteActivate_checkBox_CheckedChanged;
			// 
			// label6
			// 
			label6.AutoSize = true;
			label6.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label6.ForeColor = Color.White;
			label6.Location = new Point(313, 75);
			label6.Name = "label6";
			label6.Size = new Size(92, 20);
			label6.TabIndex = 4;
			label6.Text = "Aktif / Pasif:";
			// 
			// productName_textBox
			// 
			productName_textBox.Location = new Point(117, 74);
			productName_textBox.Name = "productName_textBox";
			productName_textBox.Size = new Size(190, 23);
			productName_textBox.TabIndex = 5;
			// 
			// saveChanges_button
			// 
			saveChanges_button.Font = new Font("Segoe UI", 12F);
			saveChanges_button.ForeColor = Color.FromArgb(39, 47, 59);
			saveChanges_button.Location = new Point(279, 173);
			saveChanges_button.Name = "saveChanges_button";
			saveChanges_button.Size = new Size(245, 33);
			saveChanges_button.TabIndex = 7;
			saveChanges_button.Text = "Değişiklikleri Kaydet";
			saveChanges_button.UseVisualStyleBackColor = true;
			saveChanges_button.Click += saveChanges_button_Click;
			// 
			// desc_textBox
			// 
			desc_textBox.Location = new Point(117, 143);
			desc_textBox.Name = "desc_textBox";
			desc_textBox.Size = new Size(407, 23);
			desc_textBox.TabIndex = 5;
			// 
			// productPrice_textbox
			// 
			productPrice_textbox.Location = new Point(117, 109);
			productPrice_textbox.Name = "productPrice_textbox";
			productPrice_textbox.Size = new Size(190, 23);
			productPrice_textbox.TabIndex = 5;
			// 
			// addProduct_button
			// 
			addProduct_button.Font = new Font("Segoe UI", 12F);
			addProduct_button.ForeColor = Color.FromArgb(39, 47, 59);
			addProduct_button.Location = new Point(23, 173);
			addProduct_button.Name = "addProduct_button";
			addProduct_button.Size = new Size(245, 33);
			addProduct_button.TabIndex = 7;
			addProduct_button.Text = "Ürünü Ekle";
			addProduct_button.UseVisualStyleBackColor = true;
			addProduct_button.Click += addProduct_button_Click;
			// 
			// productUnit_comboBox
			// 
			productUnit_comboBox.AutoCompleteMode = AutoCompleteMode.SuggestAppend;
			productUnit_comboBox.AutoCompleteSource = AutoCompleteSource.ListItems;
			productUnit_comboBox.DropDownStyle = ComboBoxStyle.DropDownList;
			productUnit_comboBox.FormattingEnabled = true;
			productUnit_comboBox.Items.AddRange(new object[] { "TEPSİ", "KG", "ADET", "KOLİ", "KUTU", "PAKET" });
			productUnit_comboBox.Location = new Point(407, 38);
			productUnit_comboBox.Name = "productUnit_comboBox";
			productUnit_comboBox.Size = new Size(75, 23);
			productUnit_comboBox.TabIndex = 6;
			// 
			// deleteProduct_button
			// 
			deleteProduct_button.Enabled = false;
			deleteProduct_button.Font = new Font("Segoe UI", 12F);
			deleteProduct_button.ForeColor = Color.FromArgb(39, 47, 59);
			deleteProduct_button.Location = new Point(279, 212);
			deleteProduct_button.Name = "deleteProduct_button";
			deleteProduct_button.Size = new Size(245, 33);
			deleteProduct_button.TabIndex = 7;
			deleteProduct_button.Text = "Ürünü Sil";
			deleteProduct_button.UseVisualStyleBackColor = true;
			deleteProduct_button.Click += deleteProduct_button_Click;
			// 
			// activePassive_AllProducts_comboBox
			// 
			activePassive_AllProducts_comboBox.AutoCompleteMode = AutoCompleteMode.SuggestAppend;
			activePassive_AllProducts_comboBox.AutoCompleteSource = AutoCompleteSource.ListItems;
			activePassive_AllProducts_comboBox.DropDownStyle = ComboBoxStyle.DropDownList;
			activePassive_AllProducts_comboBox.FormattingEnabled = true;
			activePassive_AllProducts_comboBox.Items.AddRange(new object[] { "Aktif", "Pasif" });
			activePassive_AllProducts_comboBox.Location = new Point(407, 74);
			activePassive_AllProducts_comboBox.Name = "activePassive_AllProducts_comboBox";
			activePassive_AllProducts_comboBox.Size = new Size(105, 23);
			activePassive_AllProducts_comboBox.TabIndex = 6;
			// 
			// allProducts_dataGridView
			// 
			allProducts_dataGridView.AllowUserToAddRows = false;
			allProducts_dataGridView.AllowUserToDeleteRows = false;
			allProducts_dataGridView.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
			allProducts_dataGridView.AutoSizeRowsMode = DataGridViewAutoSizeRowsMode.DisplayedCells;
			dataGridViewCellStyle1.Alignment = DataGridViewContentAlignment.MiddleLeft;
			dataGridViewCellStyle1.BackColor = SystemColors.ControlText;
			dataGridViewCellStyle1.Font = new Font("Segoe UI", 9F);
			dataGridViewCellStyle1.ForeColor = SystemColors.WindowText;
			dataGridViewCellStyle1.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle1.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle1.WrapMode = DataGridViewTriState.True;
			allProducts_dataGridView.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
			allProducts_dataGridView.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
			dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleLeft;
			dataGridViewCellStyle2.BackColor = SystemColors.Window;
			dataGridViewCellStyle2.Font = new Font("Segoe UI", 9F);
			dataGridViewCellStyle2.ForeColor = SystemColors.Control;
			dataGridViewCellStyle2.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle2.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle2.WrapMode = DataGridViewTriState.False;
			allProducts_dataGridView.DefaultCellStyle = dataGridViewCellStyle2;
			allProducts_dataGridView.Dock = DockStyle.Fill;
			allProducts_dataGridView.Location = new Point(3, 28);
			allProducts_dataGridView.MultiSelect = false;
			allProducts_dataGridView.Name = "allProducts_dataGridView";
			allProducts_dataGridView.ReadOnly = true;
			allProducts_dataGridView.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
			allProducts_dataGridView.Size = new Size(566, 455);
			allProducts_dataGridView.TabIndex = 9;
			allProducts_dataGridView.CellClick += allProducts_dataGridView_CellClick;
			// 
			// activeProducts_dataGridView
			// 
			activeProducts_dataGridView.AllowUserToAddRows = false;
			activeProducts_dataGridView.AllowUserToDeleteRows = false;
			activeProducts_dataGridView.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
			activeProducts_dataGridView.AutoSizeRowsMode = DataGridViewAutoSizeRowsMode.DisplayedCells;
			activeProducts_dataGridView.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
			dataGridViewCellStyle3.Alignment = DataGridViewContentAlignment.MiddleLeft;
			dataGridViewCellStyle3.BackColor = SystemColors.Window;
			dataGridViewCellStyle3.Font = new Font("Segoe UI", 9F);
			dataGridViewCellStyle3.ForeColor = SystemColors.Control;
			dataGridViewCellStyle3.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle3.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle3.WrapMode = DataGridViewTriState.False;
			activeProducts_dataGridView.DefaultCellStyle = dataGridViewCellStyle3;
			activeProducts_dataGridView.Dock = DockStyle.Fill;
			activeProducts_dataGridView.Location = new Point(575, 28);
			activeProducts_dataGridView.MultiSelect = false;
			activeProducts_dataGridView.Name = "activeProducts_dataGridView";
			activeProducts_dataGridView.ReadOnly = true;
			activeProducts_dataGridView.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
			activeProducts_dataGridView.Size = new Size(566, 455);
			activeProducts_dataGridView.TabIndex = 9;
			// 
			// label7
			// 
			label7.AutoSize = true;
			label7.Font = new Font("Segoe UI Semibold", 13.75F, FontStyle.Bold);
			label7.Location = new Point(3, 0);
			label7.Name = "label7";
			label7.Size = new Size(115, 25);
			label7.TabIndex = 14;
			label7.Text = "All Products";
			// 
			// label1
			// 
			label1.AutoSize = true;
			label1.BackColor = Color.FromArgb(54, 64, 78);
			label1.Font = new Font("Castellar", 22.25F);
			label1.ForeColor = Color.White;
			label1.Location = new Point(12, 9);
			label1.Name = "label1";
			label1.Size = new Size(262, 36);
			label1.TabIndex = 2;
			label1.Text = "SETTINGS PAGE";
			// 
			// connectionTestDB_button
			// 
			connectionTestDB_button.BackColor = Color.FromArgb(39, 47, 59);
			connectionTestDB_button.FlatStyle = FlatStyle.Flat;
			connectionTestDB_button.Font = new Font("Segoe UI", 12F);
			connectionTestDB_button.ForeColor = Color.White;
			connectionTestDB_button.Location = new Point(294, 10);
			connectionTestDB_button.Name = "connectionTestDB_button";
			connectionTestDB_button.Size = new Size(239, 35);
			connectionTestDB_button.TabIndex = 18;
			connectionTestDB_button.Text = "Veritabanı Bağlantısını Test Et";
			connectionTestDB_button.UseVisualStyleBackColor = false;
			connectionTestDB_button.Click += connectionTestDB_button_Click;
			// 
			// Settings
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			BackColor = Color.FromArgb(39, 47, 59);
			ClientSize = new Size(1180, 850);
			Controls.Add(connectionTestDB_button);
			Controls.Add(label1);
			Controls.Add(groupBox1);
			FormBorderStyle = FormBorderStyle.None;
			Name = "Settings";
			Text = "Settings";
			Load += Settings_Load;
			groupBox1.ResumeLayout(false);
			tableLayoutPanel1.ResumeLayout(false);
			tableLayoutPanel1.PerformLayout();
			groupBox3.ResumeLayout(false);
			groupBox4.ResumeLayout(false);
			groupBox4.PerformLayout();
			groupBox2.ResumeLayout(false);
			groupBox2.PerformLayout();
			((System.ComponentModel.ISupportInitialize)allProducts_dataGridView).EndInit();
			((System.ComponentModel.ISupportInitialize)activeProducts_dataGridView).EndInit();
			ResumeLayout(false);
			PerformLayout();
		}

		#endregion

		private GroupBox groupBox1;
		private Label label1;
		private Button deleteProduct_button;
		private ComboBox activePassive_AllProducts_comboBox;
		private ComboBox productUnit_comboBox;
		private TextBox productPrice_textbox;
		private TextBox productName_textBox;
		private Label label6;
		private Label label5;
		private Label label4;
		private Label label3;
		private Label label2;
		private Button addProduct_button;
		private DataGridView allProducts_dataGridView;
		private DataGridView activeProducts_dataGridView;
		private Button saveChanges_button;
		private CheckBox deleteActivate_checkBox;
		private TableLayoutPanel tableLayoutPanel1;
		private GroupBox groupBox2;
		private Label label8;
		private Label label7;
		private MaskedTextBox productCode_maskedTextBox;
		private GroupBox groupBox3;
		private GroupBox groupBox4;
		private Label label13;
		private TextBox productName_filter_textBox;
		private Button refreshData_byFilters_button;
		private MaskedTextBox productCodeEnd_maskedTextBox;
		private Label label12;
		private MaskedTextBox productCodeBegin_maskedTextBox;
		private Label label11;
		private Label label9;
		private ComboBox category_comboBox;
		private ComboBox activePassive_comboBox;
		private RadioButton activePassive_radioButton;
		private RadioButton allProducts_radioButton;
		private Label label10;
		private Label label14;
		private ComboBox category_AllProducts_comboBox;
		private Label label15;
		private TextBox desc_textBox;
		private CheckBox changePCode_checkBox;
		private Button connectionTestDB_button;
	}
}