namespace HarmonyBlend.Pages
{
	partial class PastOrders
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
			DataGridViewCellStyle dataGridViewCellStyle4 = new DataGridViewCellStyle();
			label1 = new Label();
			panel3 = new Panel();
			dataGridView1 = new DataGridView();
			orderPage_panel = new Panel();
			filters_groupBox = new GroupBox();
			dateTimePicker2 = new DateTimePicker();
			dateTimePicker1 = new DateTimePicker();
			button1 = new Button();
			clearFilter_button = new Button();
			label3 = new Label();
			label2 = new Label();
			label7 = new Label();
			OrderID = new DataGridViewTextBoxColumn();
			SellerName = new DataGridViewTextBoxColumn();
			TotalPrice = new DataGridViewTextBoxColumn();
			CreatedAt = new DataGridViewTextBoxColumn();
			ShowDetailed = new DataGridViewButtonColumn();
			((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
			orderPage_panel.SuspendLayout();
			filters_groupBox.SuspendLayout();
			SuspendLayout();
			// 
			// label1
			// 
			label1.AutoSize = true;
			label1.BackColor = Color.FromArgb(54, 64, 78);
			label1.Font = new Font("Castellar", 22.25F);
			label1.ForeColor = Color.White;
			label1.Location = new Point(12, 9);
			label1.Name = "label1";
			label1.Size = new Size(225, 36);
			label1.TabIndex = 2;
			label1.Text = "ORDER PAGE";
			// 
			// panel3
			// 
			panel3.Dock = DockStyle.Bottom;
			panel3.Location = new Point(0, 589);
			panel3.Name = "panel3";
			panel3.Size = new Size(1243, 63);
			panel3.TabIndex = 5;
			// 
			// dataGridView1
			// 
			dataGridView1.AllowUserToAddRows = false;
			dataGridView1.AllowUserToDeleteRows = false;
			dataGridView1.AllowUserToOrderColumns = true;
			dataGridViewCellStyle1.BackColor = Color.FromArgb(224, 224, 224);
			dataGridView1.AlternatingRowsDefaultCellStyle = dataGridViewCellStyle1;
			dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
			dataGridView1.AutoSizeRowsMode = DataGridViewAutoSizeRowsMode.DisplayedCellsExceptHeaders;
			dataGridView1.BackgroundColor = Color.FromArgb(39, 47, 59);
			dataGridView1.BorderStyle = BorderStyle.None;
			dataGridView1.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
			dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle2.BackColor = Color.FromArgb(54, 64, 78);
			dataGridViewCellStyle2.Font = new Font("Segoe UI", 11.25F, FontStyle.Regular, GraphicsUnit.Point, 162);
			dataGridViewCellStyle2.ForeColor = SystemColors.Window;
			dataGridViewCellStyle2.SelectionBackColor = Color.Silver;
			dataGridViewCellStyle2.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle2.WrapMode = DataGridViewTriState.True;
			dataGridView1.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle2;
			dataGridView1.ColumnHeadersHeight = 30;
			dataGridView1.Columns.AddRange(new DataGridViewColumn[] { OrderID, SellerName, TotalPrice, CreatedAt, ShowDetailed });
			dataGridViewCellStyle3.Alignment = DataGridViewContentAlignment.MiddleLeft;
			dataGridViewCellStyle3.BackColor = Color.Gainsboro;
			dataGridViewCellStyle3.Font = new Font("Segoe UI", 9F);
			dataGridViewCellStyle3.ForeColor = SystemColors.ControlText;
			dataGridViewCellStyle3.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle3.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle3.WrapMode = DataGridViewTriState.False;
			dataGridView1.DefaultCellStyle = dataGridViewCellStyle3;
			dataGridView1.Dock = DockStyle.Fill;
			dataGridView1.Location = new Point(0, 149);
			dataGridView1.MultiSelect = false;
			dataGridView1.Name = "dataGridView1";
			dataGridViewCellStyle4.Alignment = DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle4.BackColor = Color.FromArgb(54, 64, 78);
			dataGridViewCellStyle4.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			dataGridViewCellStyle4.ForeColor = SystemColors.Window;
			dataGridViewCellStyle4.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle4.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle4.WrapMode = DataGridViewTriState.True;
			dataGridView1.RowHeadersDefaultCellStyle = dataGridViewCellStyle4;
			dataGridView1.ScrollBars = ScrollBars.Vertical;
			dataGridView1.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
			dataGridView1.Size = new Size(1243, 503);
			dataGridView1.TabIndex = 3;
			dataGridView1.CellContentClick += dataGridView1_CellContentClick;
			// 
			// orderPage_panel
			// 
			orderPage_panel.Controls.Add(filters_groupBox);
			orderPage_panel.Controls.Add(label7);
			orderPage_panel.Dock = DockStyle.Top;
			orderPage_panel.Location = new Point(0, 0);
			orderPage_panel.Name = "orderPage_panel";
			orderPage_panel.Size = new Size(1243, 149);
			orderPage_panel.TabIndex = 4;
			// 
			// filters_groupBox
			// 
			filters_groupBox.Controls.Add(dateTimePicker2);
			filters_groupBox.Controls.Add(dateTimePicker1);
			filters_groupBox.Controls.Add(button1);
			filters_groupBox.Controls.Add(clearFilter_button);
			filters_groupBox.Controls.Add(label3);
			filters_groupBox.Controls.Add(label2);
			filters_groupBox.ForeColor = SystemColors.Control;
			filters_groupBox.Location = new Point(12, 44);
			filters_groupBox.Name = "filters_groupBox";
			filters_groupBox.Size = new Size(541, 94);
			filters_groupBox.TabIndex = 2;
			filters_groupBox.TabStop = false;
			filters_groupBox.Text = "Filtre";
			// 
			// dateTimePicker2
			// 
			dateTimePicker2.Font = new Font("Segoe UI", 11F);
			dateTimePicker2.Location = new Point(140, 58);
			dateTimePicker2.Name = "dateTimePicker2";
			dateTimePicker2.Size = new Size(230, 27);
			dateTimePicker2.TabIndex = 16;
			// 
			// dateTimePicker1
			// 
			dateTimePicker1.Font = new Font("Segoe UI", 11F);
			dateTimePicker1.Location = new Point(140, 27);
			dateTimePicker1.Name = "dateTimePicker1";
			dateTimePicker1.Size = new Size(230, 27);
			dateTimePicker1.TabIndex = 15;
			// 
			// button1
			// 
			button1.Font = new Font("Segoe UI Semibold", 11F, FontStyle.Bold);
			button1.ForeColor = SystemColors.ActiveCaptionText;
			button1.Location = new Point(376, 58);
			button1.Name = "button1";
			button1.Size = new Size(156, 27);
			button1.TabIndex = 14;
			button1.Text = "Filtreyi Kaldir";
			button1.UseVisualStyleBackColor = true;
			// 
			// clearFilter_button
			// 
			clearFilter_button.Font = new Font("Segoe UI Semibold", 11F, FontStyle.Bold);
			clearFilter_button.ForeColor = SystemColors.ActiveCaptionText;
			clearFilter_button.Location = new Point(376, 27);
			clearFilter_button.Name = "clearFilter_button";
			clearFilter_button.Size = new Size(156, 27);
			clearFilter_button.TabIndex = 14;
			clearFilter_button.Text = "Verileri Getir";
			clearFilter_button.UseVisualStyleBackColor = true;
			clearFilter_button.Click += GetPastOrderDatas_button_Click;
			// 
			// label3
			// 
			label3.AutoSize = true;
			label3.Font = new Font("Segoe UI", 11F);
			label3.ForeColor = SystemColors.Control;
			label3.Location = new Point(55, 61);
			label3.Name = "label3";
			label3.Size = new Size(79, 20);
			label3.TabIndex = 3;
			label3.Text = "Bitiş Tarihi:";
			// 
			// label2
			// 
			label2.AutoSize = true;
			label2.Font = new Font("Segoe UI", 11F);
			label2.ForeColor = SystemColors.Control;
			label2.Location = new Point(20, 30);
			label2.Name = "label2";
			label2.Size = new Size(114, 20);
			label2.TabIndex = 3;
			label2.Text = "Başlangıç Tarihi:";
			// 
			// label7
			// 
			label7.AutoSize = true;
			label7.BackColor = Color.FromArgb(54, 64, 78);
			label7.Font = new Font("Castellar", 22.25F);
			label7.ForeColor = Color.White;
			label7.Location = new Point(12, 5);
			label7.Name = "label7";
			label7.Size = new Size(315, 36);
			label7.TabIndex = 1;
			label7.Text = "PAST ORDER PAGE";
			// 
			// OrderID
			// 
			OrderID.HeaderText = "OrderID";
			OrderID.Name = "OrderID";
			OrderID.ReadOnly = true;
			// 
			// SellerName
			// 
			SellerName.HeaderText = "SellerName";
			SellerName.Name = "SellerName";
			SellerName.ReadOnly = true;
			// 
			// TotalPrice
			// 
			TotalPrice.HeaderText = "TotalPrice";
			TotalPrice.Name = "TotalPrice";
			TotalPrice.ReadOnly = true;
			// 
			// CreatedAt
			// 
			CreatedAt.HeaderText = "CreatedAt";
			CreatedAt.Name = "CreatedAt";
			CreatedAt.ReadOnly = true;
			// 
			// ShowDetailed
			// 
			ShowDetailed.HeaderText = "ShowDetailed";
			ShowDetailed.Name = "ShowDetailed";
			ShowDetailed.Text = "";
			// 
			// PastOrders
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			BackColor = Color.FromArgb(39, 47, 59);
			ClientSize = new Size(1243, 652);
			Controls.Add(panel3);
			Controls.Add(dataGridView1);
			Controls.Add(orderPage_panel);
			Controls.Add(label1);
			FormBorderStyle = FormBorderStyle.None;
			Name = "PastOrders";
			Text = "SubPage2";
			Load += PastOrders_Load;
			((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
			orderPage_panel.ResumeLayout(false);
			orderPage_panel.PerformLayout();
			filters_groupBox.ResumeLayout(false);
			filters_groupBox.PerformLayout();
			ResumeLayout(false);
			PerformLayout();
		}

		#endregion

		private Label label1;
		private Panel panel3;
		private DataGridView dataGridView1;
		private Panel orderPage_panel;
		private GroupBox filters_groupBox;
		private Button clearFilter_button;
		private Label label3;
		private Label label2;
		private Label label7;
		private DateTimePicker dateTimePicker2;
		private DateTimePicker dateTimePicker1;
		private Button button1;
		private DataGridViewTextBoxColumn OrderID;
		private DataGridViewTextBoxColumn SellerName;
		private DataGridViewTextBoxColumn TotalPrice;
		private DataGridViewTextBoxColumn CreatedAt;
		private DataGridViewButtonColumn ShowDetailed;
	}
}